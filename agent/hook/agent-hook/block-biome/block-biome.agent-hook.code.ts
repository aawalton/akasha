import {
  guarding,
  judgingCommandHook,
  ranAsJudged,
  SCOPE_FLAG,
  toldOf,
} from "akasha/agent/hook/modules/answer/hook-answer.module.code.ts"
import { bunCallIn } from "akasha/agent/hook/modules/bun-calls/bun-calls.module.code.ts"
import { refusalOver } from "akasha/agent/hook/modules/chain-refusal/chain-refusal.module.code.ts"
import {
  basenameOf,
  calledWords,
  READ_AS_BASH,
  RUNS_ANOTHER,
  ranBy,
  segmentsOf,
} from "akasha/agent/hook/modules/shell-calls/shell-calls.module.code.ts"

const HOOK = "block-biome"

const BIOME = "biome"

const THROUGH: readonly string[] = ["npx", "bunx", "pnpx", "dlx"]

const BUN_THROUGH = "x"

const REFUSAL = toldOf(HOOK, [
  "`biome` reads and writes the files the akasha commands write.",
  "A biome run that writes reaches akasha content with no gate, no index and no commit, which",
  "leaves the akasha index behind HEAD and takes the gate from every agent working here.",
  "",
  "The linter runs at the apply. `akasha change apply --draft` keeps edits and runs no check, so",
  "a draft that was accepted says nothing about what biome finds. `akasha change apply` runs",
  "biome over the edits kept and refuses the apply where biome finds anything.",
  "",
  "akasha formats every body it lands before it judges that body, so there is no formatting here",
  "to run by hand, and no command runs the linter by hand either.",
])

export const SCOPE: readonly string[] = [
  `${HOOK} refuses a call it reads as running biome, reading as well as writing.`,
  "  biome, a path ending in biome, and biome run through npx, bunx, `bun x`, pnpx or dlx",
  "The checks at an apply say what biome finds, and akasha formats every body it lands.",
  "",
  "WHERE THE RULE COMES FROM: biome writes files, and `--write` reaches akasha content with no",
  "gate, no index and no commit. That is the shape that has taken the gate down before: content",
  "changing outside the akasha commands leaves the index stamp behind HEAD. Reading is refused",
  "with it so that one command answers the question instead of two, not because a read harms.",
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
  "  a package script reaching biome. A script carries no `biome` word for this to read, so it",
  "    runs. The one script whose reach included akasha was the root `lint`, and it was taken",
  "    away rather than guessed at here. Every `lint` and `lint:fix` still there runs inside",
  "    its own package, and akasha is not a workspace, so none of them reach it. A script named",
  "    afresh tomorrow would reach it again, and this would not see that either.",
  "  `prettier`, which sits in node_modules and writes the same files under a different name",
  "  every other writer of a tracked file — `sed -i`, `cp`, a redirect, an editor, a script",
  "  a call another program builds — `xargs`, `make`, a script file",
  "  a call behind a prefix the list above does not name, which hides it as `xargs` does",
  "  a call named by a variable the line never sets, which is read as that variable",
  "",
  "ALSO REFUSED ELSEWHERE:",
  "  A write through the Write or Edit tool is refused by `block-akasha-edits`. A write through",
  "  `Bash` is reached by neither, which that hook states as its own gap.",
  "",
  "The absence of a tool from this list is NOT a finding that it is safe. It is unexamined.",
  "",
  `Printed by \`${HOOK}.agent-hook.code.ts ${SCOPE_FLAG}\`, which is the one place this sits:`,
  "it is what the program says about itself, held as text it prints rather than as a comment.",
]

export function biomeIn(segment: string): boolean {
  const words = calledWords(segment)
  const head = words[0]
  if (head === undefined) return false
  const named = basenameOf(head)
  if (named === BIOME) return true
  if (THROUGH.includes(named)) return ranBy(words.slice(1)) === BIOME
  const bun = bunCallIn(segment)
  return bun?.act === BUN_THROUGH && ranBy(bun.rest) === BIOME
}

export function refusalIn(command: string, from: string, root: string): string | null {
  if (!guarding(from, root)) return null
  return refusalOver(segmentsOf(command), (segment) => (biomeIn(segment) ? REFUSAL : null))
}

export const judgedFor = judgingCommandHook(HOOK, import.meta.path, refusalIn)

async function ran(): Promise<number> {
  return await ranAsJudged(HOOK, SCOPE, judgedFor)
}

if (import.meta.main) process.exit(await ran())
