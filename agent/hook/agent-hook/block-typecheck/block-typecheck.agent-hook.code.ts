import {
  guarding,
  judgingCommandHook,
  ranAsJudged,
  SCOPE_FLAG,
  toldOf,
} from "akasha/agent/hook/modules/answer/hook-answer.module.code.ts"
import type { BunCall } from "akasha/agent/hook/modules/bun-calls/bun-calls.module.code.ts"
import {
  bunCallIn,
  bunCallsIn,
  scriptOf,
} from "akasha/agent/hook/modules/bun-calls/bun-calls.module.code.ts"
import { refusalOver } from "akasha/agent/hook/modules/chain-refusal/chain-refusal.module.code.ts"
import {
  basenameOf,
  calledWords,
  READ_AS_BASH,
  RUNS_ANOTHER,
  segmentsOf,
} from "akasha/agent/hook/modules/shell-calls/shell-calls.module.code.ts"

const HOOK = "block-typecheck"

const COMPILERS: readonly string[] = ["tsc", "tsgo"]

const CHECKING_RUNNER = "ts-node"

const TYPE_CHECK: readonly string[] = ["--typeCheck", "--type-check"]

const SCRIPT_FILE = /\.[cm]?js$/

const RUNS_A_FILE = "node"

const RUNS = "typecheck"

const THROUGH: readonly string[] = ["npx", "bunx", "pnpx", "dlx"]

const BUN_THROUGH = "x"

const BUN_RUN = "run"

const HELP = "Say `akasha audit --help` for what it takes."

const INSTEAD: readonly string[] = [
  "  akasha audit --check typecheck   every file the akasha index names",
  "  akasha audit                     that check and the thirty-one beside it",
  "",
  HELP,
]

const REFUSAL = toldOf(HOOK, [
  "`tsc`, `tsgo`, `ts-node --typeCheck` or a compiler's own file, run by hand, does not say",
  "what a run through the akasha commands says.",
  "",
  'THE ROOT `tsconfig.json` CARRIES `"files": []`, so `tsc --noEmit` at the repository root',
  "compiles no file at all and exits 2 on one error, TS18002, that the `files` list is empty.",
  "It says nothing of any line of code, so read for the files a change touched it shows",
  "nothing, which reads exactly like a run where everything passed. A canary returning an",
  "undefined identifier draws no error from it.",
  "",
  "That is the whole warrant. A check that never reads the code is worse than no check,",
  "because it is quoted as evidence. It has passed a function calling itself forever, a name",
  "bound by nothing but a re-export, and a variable used after it was taken away.",
  "",
  ...INSTEAD,
])

const BUN_REFUSAL = toldOf(HOOK, [
  "`bun typecheck` reaches a package script, and what that script compiles is not on the line.",
  "",
  "The scripts there today reach `tsc` against a config naming the files of one package or,",
  "at the root, naming none. Neither is the answer for the akasha folder, which is typechecked",
  "over the files its index names rather than over a directory.",
  "",
  ...INSTEAD,
])

export const SCOPE: readonly string[] = [
  `${HOOK} refuses the calls that typecheck by hand:`,
  "  tsc and tsgo, a path ending in either, and either run through npx, bunx, `bun x`, pnpx",
  "    or dlx",
  "  ts-node --typeCheck and ts-node --type-check, bare or run through those same runners",
  "  a compiler's own file run by node or bun — `node …/typescript/bin/tsc`, `bun …/tsc.js`",
  "  `bun typecheck` and `bun run typecheck`, whatever flags come before the script name",
  "`akasha audit --check typecheck` is what says what the compiler finds.",
  "",
  'WHERE THE RULE COMES FROM: the root `tsconfig.json` carries `"files": []`. A `tsc --noEmit`',
  "run there compiles no file and exits 2 on TS18002 alone, the error that the `files` list is",
  "empty, so read for the files a change touched it shows nothing and reads as a run where",
  "everything passed. This is not a weak check but an empty one, and it was quoted as",
  "evidence through a whole session before a canary showed it drew no error from an undefined",
  "identifier. The three bugs it passed in one change were a function calling itself forever, a",
  "name bound by nothing but a re-export, and a variable used after it was taken away.",
  "",
  "WHERE THE CALL RUNS:",
  "  The repository this guards is the one this hook's own file is in.",
  "  A call whose working directory is outside it is let through, so a scratch copy is",
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
  ...READ_AS_BASH,
  "",
  "NOT REACHED. Each measured against this hook, not supposed:",
  "  `vue-tsc`, and every other compiler under a name the list above does not give",
  "  a compiler's file behind a node flag that takes a value, as in `node -r one tsc`",
  "  `bun run build` and every package script that reaches a compiler without naming it",
  "  a call another program builds — `xargs`, `make`, a script file",
  "  a call behind a prefix the list above does not name, which hides it as `xargs` does",
  "  a call named by a variable the line never sets, which is read as that variable",
  "  the editor's own background compiler, which runs no shell command for this to read",
  "",
  "The absence of a compiler from this list is NOT a finding that it is safe. It is unexamined.",
  "",
  `Printed by \`${HOOK}.agent-hook.code.ts ${SCOPE_FLAG}\`, which is the one place this sits:`,
  "it is what the program says about itself, held as text it prints rather than as a comment.",
]

function programFrom(words: readonly string[]): readonly string[] {
  const at = words.findIndex((one) => !one.startsWith("-"))
  return at === -1 ? [] : words.slice(at)
}

function compiles(words: readonly string[]): boolean {
  const head = words[0]
  if (head === undefined) return false
  const named = basenameOf(head).replace(SCRIPT_FILE, "")
  if (COMPILERS.includes(named)) return true
  return named === CHECKING_RUNNER && words.some((one) => TYPE_CHECK.includes(one))
}

function bunProgram(call: BunCall): readonly string[] {
  if (call.act === BUN_THROUGH) return programFrom(call.rest)
  if (call.act !== BUN_RUN) return [call.act, ...call.rest]
  const script = scriptOf(call)
  return script === null ? [] : call.rest.slice(call.rest.indexOf(script))
}

export function compilerIn(segment: string): boolean {
  const words = calledWords(segment)
  const head = words[0]
  if (head === undefined) return false
  if (compiles(words)) return true
  const named = basenameOf(head)
  if (THROUGH.includes(named) || named === RUNS_A_FILE) return compiles(programFrom(words.slice(1)))
  const bun = bunCallIn(segment)
  return bun !== null && compiles(bunProgram(bun))
}

function refusalFor(call: BunCall): string | null {
  if (call.act === RUNS) return BUN_REFUSAL
  return scriptOf(call) === RUNS ? BUN_REFUSAL : null
}

export function refusalIn(command: string, from: string, root: string): string | null {
  if (!guarding(from, root)) return null
  const overCompiler = refusalOver(segmentsOf(command), (segment) =>
    compilerIn(segment) ? REFUSAL : null
  )
  return overCompiler ?? refusalOver(bunCallsIn(command), refusalFor)
}

export const judgedFor = judgingCommandHook(HOOK, import.meta.path, refusalIn)

async function ran(): Promise<number> {
  return await ranAsJudged(HOOK, SCOPE, judgedFor)
}

if (import.meta.main) process.exit(await ran())
