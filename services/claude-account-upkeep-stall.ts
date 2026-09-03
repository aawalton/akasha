export const tool = {
  summary:
    "Rule on whether claude account upkeep, which renews every account's token and reads its usage, has stalled",
  repos: ["akasha"],
} as const

import { readFileSync, writeFileSync } from "node:fs"
import {
  ACCESS_TOKEN_EXPIRES_AT,
  type AccountReading,
  EXPIRY_FLOOR_MS,
  readingsIn,
  stallAcross,
  stallLines,
  type UpkeepStall,
  USAGE_CEILING_MS,
  USAGE_READ_AT,
} from "@akasha/agents/claude-account-upkeep-stall"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { emitReading } from "@akasha/verdict/reading-channel"
import { ALAN_PERSON, notify } from "../tools/lib/notify.ts"

const LATCH_AT = "/var/tmp/claude-account-upkeep-stall.latch"

function hoursOf(ms: number): string {
  return `${(ms / (60 * 60 * 1000)).toFixed(1)}h`
}

const HELP = `bun services/claude-account-upkeep-stall.ts — is upkeep still keeping every claude account current?

UPKEEP ON THIS WORKSTATION IS THE ONLY THING THAT RENEWS A TOKEN. The model gateway, seat
startup and the local credential file all read a credential now and none of them makes
one. Upkeep dying takes every account down with it once the last token runs out, and it
says nothing when it dies, because the thing that would report it is upkeep itself. This
is what says it instead, from outside.

It rules on two stamps upkeep writes beside each page, and reads nothing else — no database,
no network, no token:

  ${ACCESS_TOKEN_EXPIRES_AT} — upkeep renews a token once its remaining life is under the
  margin, and passes on a period whose first pass may be deferred by one further period. Two
  periods is therefore the longest a pass can legitimately be late, so an account holding less
  than ${hoursOf(EXPIRY_FLOOR_MS)} of life is one upkeep should have renewed and did not.

  ${USAGE_READ_AT} — eligibility is judged from the usage numbers alone, with no regard for how
  old they are, so upkeep stopping freezes the pool at whatever it last read: an account at a
  hundred percent stays ineligible forever. ${hoursOf(USAGE_CEILING_MS)} is a missed pass with
  a whole further pass of slack on top.

Both bounds are computed from upkeep's own margin and period rather than restated, so
changing either moves this with it.

VERDICTS: \`current\`, \`expired\`, \`expiry-behind\`, \`usage-behind\`, \`never-reached\`, \`unread\`.
The worst standing fault is the one reported, so an expired token is never hidden behind a
stale usage reading.

The population is the claude-account pages that stand, and it is stated on every run. A page
it could not look at reads \`unread\` and exits nonzero, because eight pages current and zero
pages looked at otherwise exit alike.

Usage:
  bun ~/repos/akasha/services/claude-account-upkeep-stall.ts [--json] [--notify]

  --json    Emit the whole ruling as a JSON object instead.
  --notify  Push a notification to Alan where upkeep has stalled on an account it was not
            already stalled on. For the run that happens without asking; a bare run stays
            silent so an agent can look without waking him. What was last pushed is latched
            under /var/tmp, so a stall that persists is stated once rather than on every
            pass, and a reboot costs one repeat.
  --help    This.
`

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
function readingsUnder(root: string): readonly AccountReading[] {
  const readings = readingsIn(root)
  if (readings.length === 0) {
    throw new Error(
      "no claude-account stands in akasha, and whether upkeep has stalled is ruled on by reading " +
        "each one, so none to read is a failure to look rather than a fleet in good health"
    )
  }
  return readings
}

function buildReading(stall: UpkeepStall, observedAtMs: number): StallReading {
  const findings: readonly StallFinding[] = stall.entries
    .filter((one) => one.verdict !== "current")
    .map((one) => ({ at: one.slug, detail: `${one.verdict} — ${one.detail}` }))
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
  const named = worst.slice(0, 3).map((one) => `${one.slug} ${one.verdict}`)
  const rest = worst.length > named.length ? ` and ${worst.length - named.length} more` : ""
  return (
    `${named.join(", ")}${rest}. ` +
    "Nothing else on this workstation renews a token, so the accounts go dark as their tokens run out. " +
    "`systemctl --user status claude-account-upkeep-service` is where it starts."
  )
}

async function main(argv: readonly string[]): Promise<number> {
  if (argv.includes("--help")) {
    process.stdout.write(HELP)
    return 0
  }
  const json = argv.includes("--json")
  const wanted = argv.includes("--notify")

  const root = rootFor(resolveRoots(), AKASHA)
  const stall = stallAcross(readingsUnder(root), Date.now())

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
