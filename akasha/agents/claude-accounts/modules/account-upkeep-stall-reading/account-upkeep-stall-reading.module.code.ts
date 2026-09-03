import { readFileSync, writeFileSync } from "node:fs"
import { emitReading } from "@akasha/verdict/reading-channel"
import { akashaAccountBeside, akashaAccounts } from "@tools/lib/claude-account-akasha"
import { ALAN_PERSON, notify } from "@tools/lib/notify"
import { EXPIRES_KEY } from "@tools/lib/oauth-page-push"
import {
  type AccountReading,
  stallAcross,
  stallLines,
  type UpkeepStall,
} from "@tools/lib/oauth-upkeep-stall"

const LATCH_AT = "/var/tmp/claude-account-upkeep-stall.latch"

interface StallFinding {
  readonly at: string
  readonly detail: string
}

interface StallReading {
  readonly subject: "claude-account-upkeep"
  readonly state: "measured" | "no-population"
  readonly reason: string
  readonly observedAtMs: number
  readonly coverage: {
    readonly observed: number
    readonly declared: number
    readonly unit: string
  }
  readonly evidence: UpkeepStall
  readonly findings: readonly StallFinding[]
}

// Whether upkeep has stalled is ruled on by reading each account. A fleet with no accounts in it
// is not a fleet in good health — it is a failure to look, and answering it as zero accounts
// judged would report all clear at exactly the moment this is the only thing still watching.
function readingsUnder(): readonly AccountReading[] {
  const accounts = akashaAccounts()
  if (accounts.length === 0) {
    throw new Error(
      "no claude-account stands in akasha, and whether upkeep has stalled is ruled on by reading " +
        "each one, so none to read is a failure to look rather than a fleet in good health"
    )
  }
  return accounts.map((account) => {
    const held = akashaAccountBeside(account)
    const empty = held === null || Object.keys(held).length === 0
    return {
      account,
      held: empty ? null : held,
      why: empty ? "nothing stands beside its page, or nothing that parsed" : null,
    }
  })
}

function buildReading(stall: UpkeepStall, observedAtMs: number): StallReading {
  const findings: readonly StallFinding[] = stall.entries
    .filter((one) => one.verdict !== "current")
    .map((one) => ({ at: one.account, detail: `${one.verdict} — ${one.detail}` }))
  const coverage = { observed: stall.judged, declared: stall.pages, unit: "claude-account pages" }
  if (stall.pages === 0) {
    return {
      subject: "claude-account-upkeep",
      state: "no-population",
      reason: "no claude-account page stands, so nothing could be ruled on",
      observedAtMs,
      coverage,
      evidence: stall,
      findings,
    }
  }
  return {
    subject: "claude-account-upkeep",
    state: "measured",
    reason: `${stall.current} of ${stall.pages} page(s) current with upkeep; ${stall.stalled.length} behind it, ${stall.unread.length} could not be looked at`,
    observedAtMs,
    coverage,
    evidence: stall,
    findings,
  }
}

function latchedAccounts(): readonly string[] {
  try {
    return readFileSync(LATCH_AT, "utf8")
      .split("\n")
      .filter((one) => one !== "")
  } catch {
    return []
  }
}

function holdLatch(accounts: readonly string[]): void {
  try {
    writeFileSync(LATCH_AT, accounts.join("\n"), "utf8")
  } catch (thrown) {
    process.stderr.write(
      `upkeep-stall: the latch could not be held, so this will state itself again: ${thrown instanceof Error ? thrown.message : thrown}\n`
    )
  }
}

function bodyFor(stall: UpkeepStall): string {
  const worst = stall.entries.filter((one) => one.verdict !== "current" && one.verdict !== "unread")
  const named = worst.slice(0, 3).map((one) => `${one.account} ${one.verdict}`)
  const rest = worst.length > named.length ? ` and ${worst.length - named.length} more` : ""
  return (
    `${named.join(", ")}${rest}. ` +
    "Nothing else on this workstation renews a token, so the accounts go dark as their tokens run out. " +
    "`systemctl --user status claude-account-upkeep-service` is where it starts."
  )
}

async function main(argv: readonly string[]): Promise<number> {
  const json = argv.includes("--json")
  const wanted = argv.includes("--notify")

  const stall = stallAcross(readingsUnder(), Date.now(), EXPIRES_KEY)

  if (json) {
    process.stdout.write(`${JSON.stringify(stall)}\n`)
  } else {
    process.stdout.write(`${stallLines(stall).join("\n")}\n`)
    emitReading(buildReading(stall, Date.now()))
  }

  if (wanted) {
    const already = new Set(latchedAccounts())
    const fresh = stall.stalled.filter((one) => !already.has(one))
    // A LATCH IS A RECORD THAT ALAN WAS TOLD, so it is held after the send and never before it.
    // This wrote the latch first, so a `notify` that threw — or a kill in the window between the
    // two — left every stalled account recorded as stated and the alert was never retried: one
    // lost alert, silently, for as long as those same accounts stayed stalled. The latch now
    // moves only where the notification was written.
    if (fresh.length > 0) {
      try {
        await notify(ALAN_PERSON, {
          title: `Claude account upkeep has stalled on ${stall.stalled.length} of ${stall.pages}`,
          body: bodyFor(stall),
          kind: "alert",
          source: "claude-account-upkeep-stall",
        })
      } catch (thrown) {
        process.stderr.write(
          `upkeep-stall: the alert did not land, so the latch stays where it was and the next run states it again: ${thrown instanceof Error ? thrown.message : thrown}\n`
        )
        return 1
      }
      holdLatch(stall.stalled)
    } else {
      // Nothing fresh is owed, so the latch follows what stands and recovered accounts drop out
      // of it, letting a later stall on the same account be stated rather than swallowed.
      holdLatch(stall.stalled)
    }
  }

  if (stall.pages === 0) return 1
  if (stall.unread.length > 0 || stall.stalled.length > 0) return 1
  return 0
}

if (import.meta.main) process.exit(await main(process.argv.slice(2)))
