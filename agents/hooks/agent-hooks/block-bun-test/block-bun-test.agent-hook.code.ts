import {
  guarding,
  ranAsCommandHook,
  SCOPE_FLAG,
  toldOf,
} from "akasha/agents/hooks/answer/hook-answer.module.code.ts"
import type { BunCall } from "akasha/agents/hooks/bun-calls/bun-calls.module.code.ts"
import { bunCallsIn } from "akasha/agents/hooks/bun-calls/bun-calls.module.code.ts"
import { refusalOver } from "akasha/agents/hooks/chain-refusal/chain-refusal.module.code.ts"
import { RUNS_ANOTHER } from "akasha/agents/hooks/shell-calls/shell-calls.module.code.ts"

const HOOK = "block-bun-test"

const RUNS = "test"

const REFUSED = [
  "`bun test` runs the akasha tests outside the akasha commands.",
  "Every test file in this repository is an akasha test, so no path bounds a run away from",
  "them, and a run naming no path reaches every one of them.",
  "",
  "The tests run at the apply. `akasha change draft` keeps edits and runs no check, so a draft",
  "that was accepted says nothing about whether the tests pass. `akasha change apply` runs every",
  "test beside the edits kept, in a world written out of their own bodies, and refuses the apply",
  "where one of those tests fails. The checks judge the whole set of edits kept rather than the",
  "draft that went last.",
  "",
  "No command runs a test by hand. A run by hand judges the tree the change has not landed",
  "on, which is a different question from the one the change asks.",
]

export const SCOPE: readonly string[] = [
  `${HOOK} refuses one act, \`bun test\`, wherever this reads the act.`,
  "A path on the line changes nothing. No path and no flag lets the act through.",
  "",
  "WHERE THE RULE COMES FROM: what `bun test` runs is not what it is handed.",
  "Handed nothing it runs every test file it can find. Every test file it can find here is an",
  "akasha test, because this repository's root is the akasha folder, so a path narrows a run",
  "to fewer akasha tests rather than to none. There is nothing left for a path to prove, and",
  "the akasha commands run these tests. This is the same shape as `git commit`, and for the",
  "same reason.",
  "",
  "WHERE THE CALL RUNS:",
  "  The repository this guards is the one this hook's own file is in.",
  "  A call whose working directory is outside it is let through, so a scratch copy of the",
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
  "  a call kept out of the command word, which `shell-calls` reads as part of that word, so no",
  "    bun call is read out of it at all — measured through the dispatch on 2026-09-12:",
  "      $(bun test)   H=$(bun test)   (bun test)   was let through",
  "",
  "The absence of a runner from this list is NOT a finding that it is safe. It is unexamined.",
  "",
  `Printed by \`${HOOK}.agent-hook.code.ts ${SCOPE_FLAG}\`, which is the one place this sits:`,
  "it is what the program says about itself, held as text it prints rather than as a comment.",
]

function refusalFor(call: BunCall): string | null {
  return call.act === RUNS ? toldOf(HOOK, REFUSED) : null
}

export function refusalIn(command: string, from: string, root: string): string | null {
  if (!guarding(from, root)) return null
  return refusalOver(bunCallsIn(command), refusalFor)
}

async function ran(): Promise<number> {
  return await ranAsCommandHook(HOOK, SCOPE, import.meta.path, refusalIn)
}

if (import.meta.main) process.exit(await ran())
