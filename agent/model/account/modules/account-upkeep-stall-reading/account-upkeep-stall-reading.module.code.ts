import { readFileSync, writeFileSync } from "node:fs"
import {
  type AccountReading,
  readingsIn,
  stallAcross,
  stallLines,
  type UpkeepStall,
} from "akasha/agent/model/account/modules/upkeep-stall/model-account-upkeep-stall.module.code.ts"
import {
  ALAN_PERSON,
  notify,
} from "akasha/alan/harness/notification-feed/modules/notifying/notifying.module.code.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

const LATCH_AT = "/var/tmp/model-account-upkeep-stall.latch"

const NAMED_AT_MOST = 3

interface StallFinding {
  readonly at: string
  readonly detail: string
}

interface StallReading {
  readonly subject: "model-account-upkeep"
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

function readingsUnder(root: string): readonly AccountReading[] {
  const readings = readingsIn(root)
  if (readings.length === 0) {
    throw new Error(
      "no model-account exists in akasha, and whether upkeep has stalled is ruled on by reading " +
        "each one, so none to read is a failure to look rather than a fleet in good health"
    )
  }
  return readings
}

function buildReading(stall: UpkeepStall, observedAtMs: number): StallReading {
  const findings: readonly StallFinding[] = stall.entries
    .filter((one) => one.verdict !== "current")
    .map((one) => ({ at: one.slug, detail: `${one.verdict} — ${one.detail}` }))
  const coverage = { observed: stall.judged, declared: stall.pages, unit: "model-account pages" }
  if (stall.pages === 0) {
    return {
      subject: "model-account-upkeep",
      state: "no-population",
      reason: "no model-account page exists, so nothing could be ruled on",
      observedAtMs,
      coverage,
      evidence: stall,
      findings,
    }
  }
  return {
    subject: "model-account-upkeep",
    state: "measured",
    reason: `${stall.current} of ${stall.pages} page(s) current with upkeep; ${stall.stalled.length} behind it, ${stall.unread.length} could not be looked at`,
    observedAtMs,
    coverage,
    evidence: stall,
    findings,
  }
}

const READING_ANCHOR = "READING: "

const FOLD_LINE_BREAKS = /\s*[\r\n]+\s*/g

function readingLine(reading: StallReading): string {
  const { observed, declared, unit } = reading.coverage
  const head = `${reading.state.toUpperCase()} — ${reading.subject}`
  const said = `${head}: ${reading.reason} [over ${observed} of ${declared} ${unit}]`
  return `${READING_ANCHOR}${said.replace(FOLD_LINE_BREAKS, " ")}`
}

function emitReading(reading: StallReading): undefined {
  for (const finding of reading.findings) {
    process.stderr.write(`  [${finding.at}] ${finding.detail}\n`)
  }
  process.stdout.write(`${readingLine(reading)}\n`)
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

function holdLatch(accounts: readonly string[]): undefined {
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
  const named = worst.slice(0, NAMED_AT_MOST).map((one) => `${one.slug} ${one.verdict}`)
  const rest = worst.length > named.length ? ` and ${worst.length - named.length} more` : ""
  return (
    `${named.join(", ")}${rest}. ` +
    "Nothing else on this workstation renews a token, so the accounts go dark as their tokens run out. " +
    "`systemctl --user status model-account-upkeep-service` is where it starts."
  )
}

export async function readAccountUpkeepStall(argv: readonly string[]): Promise<number> {
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
    if (fresh.length > 0) {
      try {
        await notify(ALAN_PERSON, {
          title: `Claude account upkeep has stalled on ${stall.stalled.length} of ${stall.pages}`,
          body: bodyFor(stall),
          kind: "alert",
          source: "model-account-upkeep-stall",
        })
      } catch (thrown) {
        process.stderr.write(
          `upkeep-stall: the alert did not land, so the latch stays where it was and the next run states it again: ${thrown instanceof Error ? thrown.message : thrown}\n`
        )
        return 1
      }
      holdLatch(stall.stalled)
    } else {
      holdLatch(stall.stalled)
    }
  }

  if (stall.pages === 0) return 1
  if (stall.unread.length > 0 || stall.stalled.length > 0) return 1
  return 0
}

if (import.meta.main) process.exit(await readAccountUpkeepStall(process.argv.slice(2)))
