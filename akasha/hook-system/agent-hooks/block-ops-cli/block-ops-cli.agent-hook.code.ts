import { refusalOver } from "../../chain-refusal/chain-refusal.module.code.ts"
import { ranAsHook, SCOPE_FLAG, toldOf } from "../../hook-answer/hook-answer.module.code.ts"
import {
  basenameOf,
  calledWords,
  RUNS_ANOTHER,
  segmentsOf,
} from "../../shell-calls/shell-calls.module.code.ts"

const HOOK = "block-ops-cli"

const OPS = "ops"

const REFUSAL = toldOf(HOOK, [
  "The ops CLI is turned off.",
  "",
  "What answers instead:",
  "  the file tools           reading and writing a file outside `akasha/`",
  "  ripgrep                  searching",
  "  git, run directly        anything about the history",
  "  the akasha commands      everything under `akasha/`, which records what you read",
  "                           and gates what you write",
  "",
  "Under `akasha/` this is not a preference. A read the akasha commands did not record is a",
  "read no write can be judged against, so a write after it is refused for clobbering work",
  "nobody read.",
])

export const SCOPE: readonly string[] = [
  `${HOOK} refuses every call that runs the ops CLI.`,
  "  ops, and a path ending in ops",
  "",
  "WHAT ANSWERS INSTEAD: the file tools, ripgrep, git run directly, and the akasha commands",
  "for everything under `akasha/`.",
  "",
  "WHERE THE CALL RUNS IS NOT READ. Unlike the guards over biome, tsc and bun test, this one",
  "judges a call wherever it runs. `ops` reaches this repository's dispatcher through a name on",
  "PATH rather than through a file in the working directory, so a call from a scratch copy runs",
  "the same dispatcher and is refused the same.",
  "",
  "A PREFIX THAT ONLY RUNS THE CALL BEHIND IT IS STEPPED OVER, with its own flags, the value a",
  "flag of its own takes, and the number it takes of its own:",
  `  ${RUNS_ANOTHER.join(" ")}`,
  "so `timeout 60 ops ...` is the call, and is refused wherever the call is. A prefix flag that",
  "asks rather than runs — `command -v`, `sudo -l` — leaves no call and is let through.",
  "",
  "A NAME SET BEFORE THE CALL IS NOT THE CALL. `OPS=1 ops surface` is refused for the `ops`",
  "behind the assignment, and `OPS=1 git status` is not refused at all.",
  "",
  "A refusal answers the whole call. One refused act in a chain refuses every command in it.",
  "",
  "NOT REACHED. Each measured against this hook, not supposed:",
  "  `ops` run through npx, bunx or another runner, which none of the ops entry points is",
  "    published for",
  "  `bun tools/ops/cli.ts`, which names the dispatcher's file rather than the command",
  "  a call another program builds — `sh -c`, `xargs`, `make`, a script file",
  "  a call behind a prefix the list above does not name, which hides it as `sh -c` does",
  "  a call inside a quoted run, which the dequoting step takes out before the cut",
  "",
  `Printed by \`${HOOK}.agent-hook.code.ts ${SCOPE_FLAG}\`, which is the one place this stands:`,
  "it is what the program says about itself, held as text it prints rather than as a comment.",
]

export function opsIn(segment: string): boolean {
  const words = calledWords(segment)
  const head = words[0]
  return head === undefined ? false : basenameOf(head) === OPS
}

export function refusalIn(command: string, _from: string, _root: string): string | null {
  return refusalOver(segmentsOf(command), (segment) => (opsIn(segment) ? REFUSAL : null))
}

export async function ran(): Promise<number> {
  return await ranAsHook(HOOK, "command", SCOPE, import.meta.path, refusalIn)
}

if (import.meta.main) process.exit(await ran())
