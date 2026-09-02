export const tool = {
  summary: "Rule on whether Alan's health readings are still arriving, and tell him when they stopped",
  repos: ["akasha"],
} as const

import { readFileSync, writeFileSync } from "node:fs"

import { selectLatestArrivalAt } from "@akasha/health-samples-access/latest-arrival"
import { checkoutRoot } from "@akasha/health-samples-access/sample-selecting"
import { HEALTH_METRICS } from "@akasha/health-samples-access/sample-shape"
import { ALAN_PERSON, notify } from "../tools/lib/notify.ts"

const HOUR_MS = 60 * 60 * 1000

export const SILENT_AFTER_MS = 72 * HOUR_MS

export const LOOKED_BACK_MS = 30 * 24 * HOUR_MS

const LATCH_AT = "/var/tmp/health-samples-arrival-watchdog.latch"

const REACH = [
  "WHAT THIS CANNOT SEE. It opens the day files in one checkout and nothing else. It makes no",
  "request and reaches no device, so it cannot tell a phone that is not posting from a POST that",
  "is failing from a writer that is refusing. All three read here as silence, and which one it",
  "is wants a look at the seam, the route and the journal rather than at these rows.",
  "",
  "IT IS NOT PARTITIONED, THOUGH. The web pod's checkout is reset onto origin/main at every pod",
  "start and nothing there commits or pushes, so no reading has ever accumulated in the pod: a",
  "row landing there is discarded at the next start rather than kept out of sight. This checkout",
  "is the only place these rows exist, so silence here is silence everywhere, not a partition.",
].join("\n")

function hoursOf(ms: number): string {
  return `${(ms / HOUR_MS).toFixed(1)}h`
}

const HELP = `bun services/health-samples-arrival-watchdog.ts — are Alan's health readings still arriving?

NOTHING ELSE WATCHES THIS. The readings stopped on 2026-08-23 and nine days went by before
anyone noticed, because every check over this stream reads which days carry data rather than
when a reading last arrived, and a day with no reading in it looks the same as a day Alan did
not move. \`pages/page-type/health-sample.page-type.md\` already writes the rule: whether the
stream is still posting is read from when a sample arrived, never from which days carry data.
This is that rule with something behind it.

It reads one number: the newest \`arrived-at\` across the day files, over both metrics, and
compares it against now.

THE BOUND IS ${hoursOf(SILENT_AFTER_MS)}, AND IT IS MEASURED RATHER THAN CHOSEN. Over the whole
arrival record the readings came in bursts, median 4.0h apart, and the longest gap before the
stream fell silent was 42.3h. Two further gaps of 67.1h and 101.1h stand at the end, where the
silence was already setting in. ${hoursOf(SILENT_AFTER_MS)} clears every one of them, so it
fires on none of the record; ${hoursOf(48 * HOUR_MS)} would have fired twice on gaps that may
well have been a quiet weekend. A bound tighter than the natural gap is a bound that cries wolf,
and a check that cries wolf is ignored, which is worse than no check.

Only readings that started inside the last ${LOOKED_BACK_MS / (24 * HOUR_MS)} days are read, so
a stream silent longer than that answers absent rather than old, and absent fails too.

${REACH}

VERDICTS: \`arriving\`, \`silent\`, \`none-arrived\`. It exits nonzero on either of the last two,
so the unit goes red as well as saying so.

Usage:
  bun ~/repos/akasha/services/health-samples-arrival-watchdog.ts [--json] [--notify] [--root <path>]

  --json         Emit the ruling as a JSON object instead.
  --notify       Push a notification to Alan where the stream has fallen silent since the last
                 time this said so. A bare run stays silent, so an agent can look without waking
                 him. What was last said is latched under /var/tmp, so one silence is stated once
                 rather than on every run, and a reboot costs one repeat.
  --root <path>  Read the day files under this checkout instead of the one this file stands in.
  --help         This.
`

export type Verdict = "arriving" | "silent" | "none-arrived"

export interface ArrivalRuling {
  readonly subject: "health-samples-arrival"
  readonly verdict: Verdict
  readonly root: string
  readonly latestArrivalAt: string | null
  readonly agedMs: number | null
  readonly boundMs: number
  readonly observedAtMs: number
  readonly reach: string
}

export function verdictOf(latest: string | null, agedMs: number | null, bound: number): Verdict {
  if (latest === null || agedMs === null) return "none-arrived"
  return agedMs >= bound ? "silent" : "arriving"
}

export function ruleOn(root: string, nowMs: number): ArrivalRuling {
  const startedSince = new Date(nowMs - LOOKED_BACK_MS).toISOString()
  let latest: string | null = null
  for (const metric of HEALTH_METRICS) {
    const found = selectLatestArrivalAt({ metric, startedSince, root })
    if (found === null) continue
    if (latest === null || found > latest) latest = found
  }
  const agedMs = latest === null ? null : nowMs - Date.parse(latest)
  return {
    subject: "health-samples-arrival",
    verdict: verdictOf(latest, agedMs, SILENT_AFTER_MS),
    root,
    latestArrivalAt: latest,
    agedMs,
    boundMs: SILENT_AFTER_MS,
    observedAtMs: nowMs,
    reach: REACH,
  }
}

export function saidOf(ruling: ArrivalRuling): readonly string[] {
  const bound = hoursOf(ruling.boundMs)
  const head =
    ruling.verdict === "arriving"
      ? `[health-samples-arrival] arriving — the newest reading arrived ${hoursOf(ruling.agedMs ?? 0)} ago, inside the ${bound} bound.`
      : ruling.verdict === "silent"
        ? `[health-samples-arrival] SILENT — nothing has arrived for ${hoursOf(ruling.agedMs ?? 0)}, past the ${bound} bound.`
        : `[health-samples-arrival] NONE ARRIVED — no reading in the last ${LOOKED_BACK_MS / (24 * HOUR_MS)} days carries an arrival at all.`
  return [
    head,
    `  newest arrival: ${ruling.latestArrivalAt ?? "none"}`,
    `  read under:     ${ruling.root}`,
    "",
    ruling.reach,
  ]
}

export function bodyFor(ruling: ArrivalRuling): string {
  const aged = ruling.agedMs === null ? "as far back as this looks" : hoursOf(ruling.agedMs)
  return (
    `Nothing has posted a health reading for ${aged}. Points for those days are counted off ` +
    "readings that are not there, so they read low rather than reading unknown. The sender is " +
    "an App Intent on the phone with no background trigger, so running the Shortcut once drains " +
    "the whole backlog and no reading is lost. This reads the one checkout these rows exist in, " +
    "so the silence is real; what it cannot say is which of the phone, the POST and the writer " +
    "is the one that stopped."
  )
}

function latched(): string {
  try {
    return readFileSync(LATCH_AT, "utf8").trim()
  } catch {
    return ""
  }
}

function holdLatch(said: string): void {
  try {
    writeFileSync(LATCH_AT, said, "utf8")
  } catch (thrown) {
    process.stderr.write(
      `arrival-watchdog: the latch could not be held, so this will state itself again: ${thrown instanceof Error ? thrown.message : thrown}\n`
    )
  }
}

export function rootIn(argv: readonly string[]): string | null {
  const at = argv.indexOf("--root")
  if (at === -1) return null
  const said = argv[at + 1]
  if (said === undefined || said === "" || said.startsWith("--")) {
    throw new Error("--root names no checkout, and reading the wrong tree is worse than refusing")
  }
  return said
}

async function main(argv: readonly string[]): Promise<number> {
  if (argv.includes("--help")) {
    process.stdout.write(HELP)
    return 0
  }
  const root = rootIn(argv) ?? checkoutRoot()
  const ruling = ruleOn(root, Date.now())

  if (argv.includes("--json")) {
    process.stdout.write(`${JSON.stringify(ruling)}\n`)
  } else {
    process.stdout.write(`${saidOf(ruling).join("\n")}\n`)
  }

  if (argv.includes("--notify")) {
    const said = ruling.verdict === "arriving" ? "" : (ruling.latestArrivalAt ?? "none")
    const fresh = said !== "" && said !== latched()
    holdLatch(said)
    if (fresh) {
      await notify(ALAN_PERSON, {
        title: "Your health readings have stopped arriving",
        body: bodyFor(ruling),
        kind: "alert",
        source: "health-samples-arrival-watchdog",
      })
    }
  }

  return ruling.verdict === "arriving" ? 0 : 1
}

if (import.meta.main) process.exit(await main(process.argv.slice(2)))
