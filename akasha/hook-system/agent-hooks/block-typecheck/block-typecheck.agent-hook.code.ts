import type { BunCall } from "../../bun-calls/bun-calls.module.code.ts"
import { bunCallsIn, scriptOf } from "../../bun-calls/bun-calls.module.code.ts"
import { refusalOver } from "../../chain-refusal/chain-refusal.module.code.ts"
import {
  guarding,
  ranAsHook,
  SCOPE_FLAG,
  toldOf,
} from "../../hook-answer/hook-answer.module.code.ts"
import {
  basenameOf,
  calledWords,
  RUNS_ANOTHER,
  ranBy,
  segmentsOf,
} from "../../shell-calls/shell-calls.module.code.ts"

const HOOK = "block-typecheck"

const TSC = "tsc"

const RUNS = "typecheck"

const THROUGH: readonly string[] = ["npx", "bunx", "pnpx", "dlx"]

const HELP = "Say `akasha audit --help` for what it takes."

const INSTEAD: readonly string[] = [
  "  akasha audit --check typecheck   every file the akasha index names",
  "  akasha audit                     that check and the thirty-one standing beside it",
  "",
  HELP,
]

const REFUSAL = toldOf(HOOK, [
  "`tsc` run by hand does not say what a run through the akasha commands says.",
  "",
  'THE ROOT `tsconfig.json` CARRIES `"files": []`, so `tsc --noEmit` at the repository root',
  "compiles no file at all and exits 0. It does not report a small answer; it reports success",
  "over nothing, which reads exactly like a run where everything passed. A canary returning an",
  "undefined identifier draws no error from it.",
  "",
  "That is the whole warrant. A check that cannot fail is worse than no check, because it is",
  "quoted as evidence. It has passed a function calling itself forever, a name bound by nothing",
  "but a re-export, and a variable used after it was taken away.",
  "",
  ...INSTEAD,
])

const BUN_REFUSAL = toldOf(HOOK, [
  "`bun typecheck` reaches a package script, and what that script compiles is not on the line.",
  "",
  "The scripts standing today reach `tsc` against a config naming the files of one package or,",
  "at the root, naming none. Neither is the answer for the akasha folder, which is typechecked",
  "over the files its index names rather than over a directory.",
  "",
  ...INSTEAD,
])

export const SCOPE: readonly string[] = [
  `${HOOK} refuses the calls that typecheck by hand:`,
  "  tsc, a path ending in tsc, and tsc run through npx, bunx, pnpx or dlx",
  "  `bun typecheck` and `bun run typecheck`, whatever flags come before the script name",
  "`akasha audit --check typecheck` is what says what the compiler finds.",
  "",
  'WHERE THE RULE COMES FROM: the root `tsconfig.json` carries `"files": []`. A `tsc --noEmit`',
  "run there compiles no file and exits 0, so it reports success over nothing and reads as a",
  "run where everything passed. This is not a weak check but an empty one, and it was quoted as",
  "evidence through a whole session before a canary showed it drew no error from an undefined",
  "identifier. The three bugs it passed in one change were a function calling itself forever, a",
  "name bound by nothing but a re-export, and a variable used after it was taken away.",
  "",
  "WHERE THE CALL RUNS:",
  "  The repository this guards is the one this hook's own file stands in.",
  "  A call whose working directory stands outside it is let through, so a scratch copy is",
  "    checked as usual. A second worktree of this repository is not guarded from here either.",
  "  A call stating no working directory is judged as though it ran here.",
  "",
  "A PREFIX THAT ONLY RUNS THE CALL BEHIND IT IS STEPPED OVER, with its own flags, the value a",
  "flag of its own takes, and the number it takes of its own:",
  `  ${RUNS_ANOTHER.join(" ")}`,
  "so `timeout 900 <call>` is the call, and is refused wherever the call is. A prefix flag that",
  "asks rather than runs — `command -v`, `sudo -l` — leaves no call and is let through.",
  "That list samples an open class too. A prefix it does not name hides the call behind it.",
  "",
  "A refusal answers the whole call. One refused act in a chain refuses every command in it.",
  "",
  "NOT REACHED. Each measured against this hook, not supposed:",
  "  `vue-tsc`, `tsgo`, `ts-node --type-check`, and every other compiler under another name",
  "  `bun run build` and every package script that reaches a compiler without naming it",
  "  a call another program builds — `sh -c`, `xargs`, `make`, a script file",
  "  a call behind a prefix the list above does not name, which hides it as `sh -c` does",
  "  a call inside a quoted run, which the dequoting step takes out before the cut",
  "  a call in a heredoc body, which that step does not take out, so data naming tsc is",
  "    refused as though it were a command",
  "  the editor's own background compiler, which runs no shell command for this to read",
  "",
  "The absence of a compiler from this list is NOT a finding that it is safe. It is unexamined.",
  "Do not close a gap here by adding the compiler. A denylist over an open hazard family teaches",
  "its own holes: the refusal is what sends a reader looking for the neighbouring compiler it",
  "did not name, and a longer list is a longer search prompt. A gap found here is evidence that",
  "this guard cannot close its class, not an invitation to extend it.",
  "",
  `Printed by \`${HOOK}.agent-hook.code.ts ${SCOPE_FLAG}\`, which is the one place this stands:`,
  "it is what the program says about itself, held as text it prints rather than as a comment.",
]

export function tscIn(segment: string): boolean {
  const words = calledWords(segment)
  const head = words[0]
  if (head === undefined) return false
  const named = basenameOf(head)
  if (named === TSC) return true
  return THROUGH.includes(named) && ranBy(words.slice(1)) === TSC
}

export function refusalFor(call: BunCall): string | null {
  if (call.act === RUNS) return BUN_REFUSAL
  return scriptOf(call) === RUNS ? BUN_REFUSAL : null
}

export function refusalIn(command: string, from: string, root: string): string | null {
  if (!guarding(from, root)) return null
  const overTsc = refusalOver(segmentsOf(command), (segment) => (tscIn(segment) ? REFUSAL : null))
  return overTsc ?? refusalOver(bunCallsIn(command), refusalFor)
}

export async function ran(): Promise<number> {
  return await ranAsHook(HOOK, "command", SCOPE, import.meta.path, refusalIn)
}

if (import.meta.main) process.exit(await ran())
