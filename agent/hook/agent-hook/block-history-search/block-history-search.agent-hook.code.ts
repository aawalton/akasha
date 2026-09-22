import {
  judgingCommandHook,
  ranAsJudged,
  SCOPE_FLAG,
  toldOf,
} from "akasha/agent/hook/modules/answer/hook-answer.module.code.ts"
import { judgingCalls } from "akasha/agent/hook/modules/chain-refusal/chain-refusal.module.code.ts"
import type { GitCall } from "akasha/agent/hook/modules/git-calls/git-calls.module.code.ts"
import { gitCallsIn } from "akasha/agent/hook/modules/git-calls/git-calls.module.code.ts"
import { RUNS_ANOTHER } from "akasha/agent/hook/modules/shell-calls/shell-calls.module.code.ts"

const HOOK = "block-history-search"

const ACTS: readonly string[] = ["log", "rev-list"]

const FLAGS: readonly string[] = ["-S", "-G", "--pickaxe-regex"]

const JOINED: readonly string[] = ["-S", "-G"]

const REFUSED = [
  "`git log -S` and `-G` search every commit in this repository for a change to the text you name.",
  "Every one of them reads the whole history, and no flag makes one cheap.",
  "",
  "Measured on this repository on 2026-09-13: one such search spent 54.9 seconds of processor and",
  "120.9 seconds of wall clock. The same search without `--all` spent 55.9 seconds — the flag that",
  "looks like the expensive part is not the expensive part. On 2026-09-13 nine of these ran at once",
  "and took the machine from a load average of 63 to 82, with about eighty more queued behind them.",
  "",
  "IF WHAT YOU WANT IS WHERE A SYMBOL LIVES NOW, a working-tree search answers it:",
  "",
  "  rg -l '<the symbol>' .",
  "",
  "That call spent 0.7 seconds on the symbol the search above spent 54.9 seconds on, and named the",
  "one file holding it. Which files reach a path is in the index already, and reading it there",
  "costs nothing.",
  "",
  "IF WHAT YOU WANT IS A HISTORY QUESTION — did this symbol ever have a caller, did a landing say",
  "the removal was meant — no akasha command answers it today and none is planned. Say what you",
  "were doing and ask Alan.",
]

export const SCOPE: readonly string[] = [
  `${HOOK} refuses two git acts, \`log\` and \`rev-list\`, carrying one of three flags:`,
  "  -S   -G   --pickaxe-regex",
  "A flag joined to its text is that flag, so `-Sfoo` and `--pickaxe-regex=one` are read here.",
  "Every such call is refused, always. No path, no revision range and no other flag lets one",
  "through, and nothing about the machine is read before refusing.",
  "",
  "WHERE THE RULE COMES FROM: on 2026-09-13 nine of these ran at once on this machine and took",
  "the load average from 63 to 82, with roughly eighty more calls queued behind them. One such",
  "search spends about 55 seconds of processor whatever flags narrow it, because it reads every",
  "commit in the repository either way. The cost is the number of them running rather than the",
  "shape of any one of them, so there is no narrowing that turns one into a small call.",
  "",
  "WHY NOT `--all`: measured both ways on 2026-09-13 — with `--all`, 54.9 seconds of processor;",
  "without it, 55.9 seconds. A refusal keyed on `--all` would be dropped by dropping the flag,",
  "and the call left behind would cost the same. So the flag is not read here at all.",
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
  "  `git grep`, which searches the working tree rather than history",
  "  `git log --grep`, which searches commit messages rather than a change to some text",
  "  a search another program builds — `sh -c`, `xargs git`, a script file",
  "  a call behind a prefix the list above does not name, which hides it as `sh -c` does",
  "  an act kept out of the command word, which `shell-calls` reads as part of that word, so no",
  "    git call is read out of it at all — measured against this hook on 2026-09-13:",
  "      $(git log -S one)   H=$(git log -S one)   (git log -S one)   was let through",
  "  anything not sent as a tool call, which no hook is given at all",
  "",
  "The absence of a form from this list is NOT a finding that it is safe. It is unexamined.",
  "",
  `Printed by \`${HOOK}.agent-hook.code.ts ${SCOPE_FLAG}\`, which is the one place this sits:`,
  "it is what the program says about itself, held as text it prints rather than as a comment.",
]

function searchingWord(word: string): boolean {
  if (FLAGS.includes(word)) return true
  if (FLAGS.some((flag) => word.startsWith(`${flag}=`))) return true
  return JOINED.some((flag) => word.length > flag.length && word.startsWith(flag))
}

export function searchesHistory(call: GitCall): boolean {
  return ACTS.includes(call.act) && call.rest.some((word) => searchingWord(word))
}

export function refusalFor(call: GitCall): string | null {
  return searchesHistory(call) ? toldOf(HOOK, REFUSED) : null
}

export const refusalIn = judgingCalls(gitCallsIn, refusalFor)

export const judgedFor = judgingCommandHook(HOOK, import.meta.path, refusalIn)

async function ran(): Promise<number> {
  return await ranAsJudged(HOOK, SCOPE, judgedFor)
}

if (import.meta.main) process.exit(await ran())
