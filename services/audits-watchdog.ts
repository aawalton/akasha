import { mkdtempSync, readFileSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { over, render, type Outcome } from "@akasha/verdict/outcome"
import { akashaRoot } from "@akasha/pages-system/checkout-roots"
import { seconds } from "../tools/lib/run-cost.ts"
import {
  AUDITS,
  auditFileStems,
  died,
  registered,
  shortened,
  spread,
  unrun,
} from "../tools/audits/audits.ts"

/**
 * The whole run's wall bound. Past it, what has not run is named and refuses.
 *
 * The first whole run took 99.5s, so this is nine times what the work measured.
 * It is headroom for an audit that hangs, not a budget the run is meant to use.
 */
export const BUDGET_MS = 900_000

/**
 * One audit's wall bound, so a single hung audit cannot eat the whole budget in
 * silence. The slowest audit measured 49.4s, and this is six times that.
 */
export const PER_AUDIT_MS = 300_000

const REACH = [
  "WHAT THIS IS NOT. It is not a landing gate. It runs on a clock, after the fact, and refuses",
  "nobody's change: nothing here writes a green mark, holds a lock, or prices an audit against a",
  "ceiling every seat would pay on every landing. The runner that did those things was deleted on",
  "purpose and this does not bring it back. The audits it was deleted from around were kept on",
  "purpose, and this is how they answer.",
  "",
  "WHAT IT CANNOT SEE. It judges one checkout as it now stands, so it cannot say when a refusal",
  "first appeared or which change brought it. A red board says the tree is in that state now, not",
  "that the last landing put it there.",
].join("\n")

const HELP = `bun services/audits-watchdog.ts — run the audits under tools/audits and go red when one refuses

NOTHING ELSE RUNS THESE. The live check net is handed \`insideOf\` and keeps only paths under
\`akasha/\`, which is 40 of the 57010 markdown documents in this repository. These audits reach the
other 97%: 2530 unresolved relations across 55005 pages, 55144 claimed pages judged for naming
and for shape, 105 category rules over 36720 distinguishable transactions and 108 email rules
over 21174 messages, none of which anything else asks about. The checks package states its reach
as a departure, so this is no hole in it — it is the rest of the tree, answered here.

IT DOES NOT NOTIFY. Alan asked that nothing be pushed to his phone, so the unit going red is the
whole signal until he says otherwise. There is no --notify flag and nothing here reaches a device.

EACH AUDIT RUNS IN ITS OWN PROCESS. Four of them load every command this repository declares, and
two of those commands import a retired cluster check that calls \`process.exit\` while it is being
imported. That cannot be caught, so in one process it ends the run and the other twenty-four go
unwatched with nothing said. An audit whose process leaves without writing a verdict is reported
by name as a refusal, with the tail of what it said.

AN AUDIT THAT MEASURED NOTHING AND PASSED IS TURNED INTO A REFUSAL, because an empty search
reports no violations for the same reason a clean tree does. An audit the ${seconds(BUDGET_MS)}
budget never reached is named and refuses too, so a board short of the whole account never reads
as clean over it. Long message lists are cut for drawing only, and the number held back is stated
beside the way to see more: the verdict, the counts and the exit code are never cut. Several audits
cap their own lists before this reads them, so --full is more than a bare run and still not all.

${REACH}

It exits nonzero when anything refused, so the unit goes red as well as saying so.

Usage:
  bun ~/repos/akasha/services/audits-watchdog.ts [--audit <name> …] [--json] [--list] [--full]

  --audit <name>  Run only this audit. Repeatable. A name no audit carries is refused rather
                  than dropped, because a suite run green reads as the answer to a question
                  about the one audit that was named.
  --full          Draw every message the audits handed back. Several audits cap their own
                  message list before this ever sees it — \`pages-hold-shape\` shows twelve
                  refusal lines and counts the rest — so this is not everything they found.
  --list          Name every audit and run none.
  --json          Emit the outcomes as JSON instead of drawing them.
  --help          This.

Exit codes:
  0  every audit passed over a population it measured
  1  at least one audit refused, threw, died, measured nothing, or was never reached
  2  the arguments were not usable
`

export interface Argument {
  readonly only: readonly string[]
  readonly json: boolean
  readonly list: boolean
  readonly full: boolean
  readonly help: boolean
}

export function argumentsIn(argv: readonly string[]): Argument | string {
  const only: string[] = []
  let json = false
  let list = false
  let full = false
  for (let at = 0; at < argv.length; at += 1) {
    const said = argv[at] as string
    if (said === "--help" || said === "-h") return { only, json, list, full, help: true }
    if (said === "--json") json = true
    else if (said === "--list") list = true
    else if (said === "--full") full = true
    else if (said === "--audit") {
      const value = argv[at + 1]
      if (value === undefined || value.startsWith("-")) return "--audit names no audit"
      only.push(value)
      at += 1
    } else return `\`${said}\` is not a flag this takes — run it with --help`
  }
  return { only, json, list, full, help: false }
}

function unknown(name: string): Outcome {
  return {
    name,
    verdict: "fail",
    detail: "no such audit",
    messages: [`\`${name}\` is not one of: ${Object.keys(AUDITS).join(", ")}`],
    population: over(0, "audit(s)"),
  }
}

/** Runs one audit in a process of its own and answers what it judged. */
export function spawnAudit(
  root: string,
  name: string,
  outAt: string,
  boundMs: number
): readonly Outcome[] {
  const run = Bun.spawnSync({
    cmd: [
      "bun",
      `${root}/tools/audits/run-one.ts`,
      name,
      "--out",
      outAt,
      "--deadline-ms",
      `${boundMs}`,
    ],
    cwd: root,
    stdout: "pipe",
    stderr: "pipe",
    timeout: boundMs,
  })
  const said = run.stdout.toString() + run.stderr.toString()
  try {
    const read = JSON.parse(readFileSync(outAt, "utf8")) as Outcome[]
    if (read.length > 0) return read
  } catch {
    // No verdict was written, so the process left before answering. Say so below.
  }
  return [died(name, run.exitCode, said)]
}

export interface Run {
  readonly outcomes: readonly Outcome[]
  readonly elapsedMs: number
  readonly refused: boolean
}

export function runAudits(
  root: string,
  only: readonly string[],
  budgetMs: number,
  now: () => number = Date.now
): Run {
  const startedAt = now()
  const deadlineAt = startedAt + budgetMs
  const names = only.length === 0 ? Object.keys(AUDITS) : only
  const box = mkdtempSync(join(tmpdir(), "audits-watchdog-"))
  const outcomes: Outcome[] = []
  const missed: string[] = []
  try {
    for (const [at, name] of names.entries()) {
      if (AUDITS[name] === undefined) {
        outcomes.push(unknown(name))
        continue
      }
      const left = deadlineAt - now()
      if (left <= 0) {
        missed.push(...names.slice(at).filter((each) => AUDITS[each] !== undefined))
        break
      }
      outcomes.push(
        ...spawnAudit(root, name, join(box, `${name}.json`), Math.min(left, PER_AUDIT_MS))
      )
    }
  } finally {
    rmSync(box, { recursive: true, force: true })
  }
  if (missed.length > 0) outcomes.push(unrun(missed, budgetMs))
  return {
    outcomes,
    elapsedMs: now() - startedAt,
    refused: outcomes.some((each) => each.verdict === "fail"),
  }
}

export function saidOf(run: Run, board: readonly Outcome[]): readonly string[] {
  const refused = run.outcomes.filter((each) => each.verdict === "fail")
  const passed = run.outcomes.filter((each) => each.verdict === "pass")
  const head =
    refused.length === 0
      ? `[audits-watchdog] clean — ${passed.length} audit(s) passed over a population each measured, in ${seconds(run.elapsedMs)}.`
      : `[audits-watchdog] ${refused.length} REFUSED of ${run.outcomes.length} answer(s), in ${seconds(run.elapsedMs)}: ${refused.map((each) => each.name).join(", ")}`
  return [head, "", ...render(board), "", REACH]
}

async function main(argv: readonly string[]): Promise<number> {
  const read = argumentsIn(argv)
  if (typeof read === "string") {
    process.stderr.write(`audits-watchdog: ${read}\n`)
    return 2
  }
  if (read.help) {
    process.stdout.write(HELP)
    return 0
  }
  if (read.list) {
    process.stdout.write(`${Object.keys(AUDITS).join("\n")}\n`)
    return 0
  }
  const root = akashaRoot()
  const ran = runAudits(root, read.only, BUDGET_MS)
  // What stands unregistered is asked only of a whole run: naming one audit asks
  // about that audit, and answering about the whole folder would bury it.
  const account = read.only.length === 0 ? [registered(auditFileStems(`${root}/tools/audits`))] : []
  const outcomes = [...ran.outcomes, ...account]
  const refused = outcomes.some((each) => each.verdict === "fail")
  const run: Run = { ...ran, outcomes, refused }
  const board = [...outcomes, spread(ran.outcomes, ran.elapsedMs)]
  const drawn = read.full ? board : board.map((each) => shortened(each))
  if (read.json) {
    process.stdout.write(
      `${JSON.stringify({ outcomes: board, elapsedMs: ran.elapsedMs, refused })}\n`
    )
  } else {
    process.stdout.write(`${saidOf(run, drawn).join("\n")}\n`)
  }
  return refused ? 1 : 0
}

if (import.meta.main) process.exit(await main(process.argv.slice(2)))
