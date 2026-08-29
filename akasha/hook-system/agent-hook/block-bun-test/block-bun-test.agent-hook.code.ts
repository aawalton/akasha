import { dirname, resolve, sep } from "node:path"
import type { BunCall } from "../../bun-calls.module.code.ts"
import { bunCallsIn } from "../../bun-calls.module.code.ts"
import {
  ASIDE,
  commandIn,
  refusing,
  said,
  STANDING_ASIDE,
} from "../../hook-answer.module.code.ts"

const HOOK = "block-bun-test"

const SCOPE_FLAG = "--scope"

const RUNS = "test"

const INSIDE = "akasha"

const HELP = "Say `akasha test --help` for what it takes."

const EVERYWHERE: readonly string[] = [".", "..", "./", "/", "*"]

const VALUED: readonly string[] = [
  "-t",
  "--test-name-pattern",
  "--timeout",
  "--reporter",
  "--reporter-outfile",
  "--coverage-reporter",
  "--coverage-dir",
  "--concurrency",
]

const UNBOUNDED = [
  "`bun test` naming no path runs every test in this repository.",
  "What a run reaches is not on the command line, so the line has to say what the run is for.",
  "",
  `  under \`${INSIDE}/\`:  akasha test`,
  "  anywhere else:    bun test <path>, naming what it runs",
  "",
  HELP,
]

const REACHING = [
  "`bun test` reaching `akasha/` runs the akasha tests outside the akasha commands.",
  "`akasha test` counts the test files standing under what it was named and refuses a run that",
  "reached fewer, and it reads the verdict from what the run printed rather than from the exit",
  "code, which a suite leaking a handle makes non-zero on a run where nothing failed.",
  "",
  "  akasha test                     every test under `akasha/`",
  "  akasha test --file-path <path>  the tests under one path",
  "",
  HELP,
]

export const SCOPE: readonly string[] = [
  `${HOOK} refuses two forms of one verb, \`bun test\`:`,
  "  naming no path, which runs every test in this repository",
  "  naming a path that reaches the akasha folder, which the akasha commands run instead",
  "A call naming only paths outside the akasha folder is let through.",
  "",
  "WHERE THE RULE COMES FROM: what `bun test` runs is not what it is handed.",
  "Handed nothing it runs every test file it can find, and thousands of them stand outside the",
  "akasha folder. So the line has to say what the run is for, and a line that says nothing is",
  "refused. This is the same shape as an unbounded `git commit`, and for the same reason.",
  "",
  "WHAT A PATH DOES AND DOES NOT PROVE:",
  "  A path is judged by its own words. A segment `akasha` means inside.",
  "  `.` and `..` and `*` are read as naming everything, so they bound nothing.",
  "  A flag's value is never read as a path, so `--timeout 5000` bounds no call.",
  "",
  "WHERE THE CALL RUNS:",
  "  The repository this guards is the one this hook's own file stands in.",
  "  A call whose working directory stands outside it is let through, so a scratch copy of the",
  "    akasha folder is tested as usual. A second worktree of this repository is not guarded",
  "    from here either, which is the same bound `block-akasha-edits` carries.",
  "  A call stating no working directory is judged as though it ran here.",
  "",
  "A refusal answers the whole call. One refused verb in a chain refuses every command in it.",
  "",
  "NOT REACHED. Each measured against this hook, not supposed:",
  "  `bun run test`, and every package script that reaches a test runner",
  "  `bunx`, `npm test`, `node --test`, `vitest`, `jest`, `make` — every runner that is not this",
  "  a filter naming no `akasha` segment that still reaches akasha, because a bun filter matches",
  "    anywhere in a path: `bun test command-system` reaches akasha and is let through. That is",
  "    a gap, not a rule, and it is why this guard cannot close its class.",
  "  a call another program builds — `sh -c`, `xargs bun`, `make`, a script file",
  "  a verb inside a quoted run, which the dequoting step takes out before the cut",
  "  a verb in a heredoc body, which that step does not take out, so data naming a verb is",
  "    refused as though it were a command",
  "",
  "The absence of a runner from this list is NOT a finding that it is safe. It is unexamined.",
  "Do not close a gap here by adding the runner. A denylist over an open hazard family teaches",
  "its own holes: the refusal is what sends a reader looking for the neighbouring runner it did",
  "not name, and a longer list is a longer search prompt. A gap found here is evidence that",
  "this guard cannot close its class, not an invitation to extend it.",
  "",
  `Printed by \`${HOOK}.agent-hook.code.ts ${SCOPE_FLAG}\`, which is the one place this stands:`,
  "it is what the program says about itself, held as text it prints rather than as a comment.",
]

export function reachesAkasha(filter: string): boolean {
  if (filter === "") return true
  if (EVERYWHERE.includes(filter)) return true
  if (filter.startsWith("..")) return true
  return filter.split("/").includes(INSIDE)
}

export function filtersOf(rest: readonly string[]): readonly string[] {
  const held: string[] = []
  let at = 0
  while (at < rest.length) {
    const one = rest[at] ?? ""
    if (VALUED.includes(one)) {
      at += 2
      continue
    }
    if (!one.startsWith("-")) held.push(one)
    at += 1
  }
  return held
}

function toldOf(told: readonly string[]): string {
  return [`${HOOK} refused this call.`, "", ...told].join("\n")
}

export function refusalFor(call: BunCall): string | null {
  if (call.verb !== RUNS) return null
  const filters = filtersOf(call.rest)
  if (filters.length === 0) return toldOf(UNBOUNDED)
  return filters.some(reachesAkasha) ? toldOf(REACHING) : null
}

export function guarding(from: string, root: string): boolean {
  if (from.trim() === "") return true
  const at = resolve(from)
  return at === root || at.startsWith(`${root}${sep}`)
}

export function refusalIn(command: string, from: string, root: string): string | null {
  if (!guarding(from, root)) return null
  for (const call of bunCallsIn(command)) {
    const reason = refusalFor(call)
    if (reason !== null) return reason
  }
  return null
}

function fromIn(raw: string): string {
  try {
    const payload: unknown = JSON.parse(raw)
    const held = (payload as Record<string, unknown> | null)?.["cwd"]
    return typeof held === "string" ? held : ""
  } catch {
    return ""
  }
}

async function main(): Promise<number> {
  if (Bun.argv[2] === SCOPE_FLAG) {
    process.stdout.write(`${SCOPE.join("\n")}\n`)
    return ASIDE
  }
  const raw = await Bun.stdin.text()
  const read = commandIn(raw, "command", HOOK)
  if ("answer" in read) return said(read.answer)
  const root = resolve(dirname(import.meta.path), "..", "..", "..", "..")
  const reason = refusalIn(read.command, fromIn(raw), root)
  return said(reason === null ? STANDING_ASIDE : refusing(reason))
}

if (import.meta.main) process.exit(await main())
