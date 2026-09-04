import type { BunCall } from "../../bun-calls/bun-calls.module.code.ts"
import { bunCallsIn } from "../../bun-calls/bun-calls.module.code.ts"
import { refusalOver } from "../../chain-refusal/chain-refusal.module.code.ts"
import {
  guarding,
  ranAsHook,
  SCOPE_FLAG,
  toldOf,
} from "../../hook-answer/hook-answer.module.code.ts"
import { RUNS_ANOTHER } from "../../shell-calls/shell-calls.module.code.ts"

const HOOK = "block-bun-test"

const RUNS = "test"

const HELP = "Say `akasha test --help` for what it takes."

const REFUSED = [
  "`bun test` runs the akasha tests outside the akasha commands.",
  "Every test file in this repository is an akasha test, so no path bounds a run away from",
  "them, and a run naming no path reaches every one of them.",
  "`akasha test` counts the test files standing under what it was named and refuses a run that",
  "reached fewer, and it reads the verdict from what the run printed rather than from the exit",
  "code, which a suite leaking a handle makes non-zero on a run where nothing failed.",
  "",
  "  akasha test                     every test in this repository",
  "  akasha test --file-path <path>  the tests under one path",
  "",
  HELP,
]

export const SCOPE: readonly string[] = [
  `${HOOK} refuses one act, \`bun test\`, in every form it is written in.`,
  "A path on the line changes nothing. There is no form of it this lets through.",
  "",
  "WHERE THE RULE COMES FROM: what `bun test` runs is not what it is handed.",
  "Handed nothing it runs every test file it can find. Every test file it can find here is an",
  "akasha test, because this repository's root is the akasha folder, so a path narrows a run",
  "to fewer akasha tests rather than to none. There is nothing left for a path to prove, and",
  "the akasha commands run these tests. This is the same shape as `git commit`, and for the",
  "same reason.",
  "",
  "WHERE THE CALL RUNS:",
  "  The repository this guards is the one this hook's own file stands in.",
  "  A call whose working directory stands outside it is let through, so a scratch copy of the",
  "    akasha folder is tested as usual. A second worktree of this repository is not guarded",
  "    from here either, which is the same bound `block-akasha-edits` carries.",
  "  A call stating no working directory is judged as though it ran here.",
  "  That place is the one thing read besides the act. No word after `test` is read at all.",
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
  "  `bun run test`, and every package script that reaches a test runner",
  "  `bunx`, `npm test`, `node --test`, `vitest`, `jest`, `make` — every runner that is not this",
  "  a call another program builds — `sh -c`, `xargs bun`, `make`, a script file",
  "  a call behind a prefix the list above does not name, which hides it as `sh -c` does",
  "  an act inside a quoted run, which the dequoting step takes out before the cut",
  "  an act in a heredoc body, which that step does not take out, so data naming an act is",
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

export function refusalFor(call: BunCall): string | null {
  return call.act === RUNS ? toldOf(HOOK, REFUSED) : null
}

export function refusalIn(command: string, from: string, root: string): string | null {
  if (!guarding(from, root)) return null
  return refusalOver(bunCallsIn(command), refusalFor)
}

export async function ran(): Promise<number> {
  return await ranAsHook(HOOK, "command", SCOPE, import.meta.path, refusalIn)
}

if (import.meta.main) process.exit(await ran())
