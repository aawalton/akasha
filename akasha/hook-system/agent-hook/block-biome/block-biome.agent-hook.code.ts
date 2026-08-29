import { resolve, sep } from "node:path"
import {
  ASIDE,
  commandIn,
  refusing,
  rootOf,
  STANDING_ASIDE,
  said,
} from "../../hook-answer.module.code.ts"
import { basenameOf, segmentsOf, wordsOf } from "../../shell-calls.module.code.ts"

const HOOK = "block-biome"

const SCOPE_FLAG = "--scope"

const BIOME = "biome"

const ASSIGNMENT = /^[A-Za-z_][A-Za-z0-9_]*=/

const SETTING_UP: readonly string[] = ["sudo", "env"]

const THROUGH: readonly string[] = ["npx", "bunx", "pnpx", "dlx"]

const REFUSAL = [
  `${HOOK} refused this call.`,
  "",
  "`biome` reads and writes the files the akasha commands are the door for.",
  "A biome run that writes reaches akasha content with no gate, no index and no commit, which",
  "leaves the akasha index behind HEAD and takes the gate from every agent working here.",
  "",
  "To see what biome finds:",
  "  akasha lint                     every file under `akasha/`",
  "  akasha lint --file-path <path>  one path",
  "",
  "akasha formats every body it lands, so there is no formatting here to run by hand.",
  "Say `akasha lint --help` for what it takes.",
].join("\n")

export const SCOPE: readonly string[] = [
  `${HOOK} refuses every call that runs biome, reading as well as writing.`,
  "  biome, a path ending in biome, and biome run through npx, bunx, pnpx or dlx",
  "`akasha lint` is what says what biome finds, and akasha formats every body it lands.",
  "",
  "WHERE THE RULE COMES FROM: biome writes files, and `--write` reaches akasha content with no",
  "gate, no index and no commit. That is the shape that has taken the gate down before: content",
  "changing outside the akasha commands leaves the index stamp behind HEAD. Reading is refused",
  "with it so that one command answers the question instead of two, not because a read harms.",
  "",
  "WHERE THE CALL RUNS:",
  "  The repository this guards is the one this hook's own file stands in.",
  "  A call whose working directory stands outside it is let through, so a scratch copy is",
  "    checked as usual. A second worktree of this repository is not guarded from here either.",
  "  A call stating no working directory is judged as though it ran here.",
  "",
  "A refusal answers the whole call. One refused verb in a chain refuses every command in it.",
  "",
  "NOT REACHED. Each measured against this hook, not supposed:",
  "  a package script reaching biome. A script carries no `biome` word for this to read, so it",
  "    runs. The one script whose reach included akasha was the root `lint`, and it was taken",
  "    away rather than guessed at here. Every `lint` and `lint:fix` still standing runs inside",
  "    its own package, and akasha is not a workspace, so none of them reach it. A script named",
  "    afresh tomorrow would reach it again, and this would not see that either.",
  "  `prettier`, which stands in node_modules and writes the same files under a different name",
  "  every other writer of a tracked file — `sed -i`, `cp`, a redirect, an editor, a script",
  "  a call another program builds — `sh -c`, `xargs`, `make`, a script file",
  "  a call inside a quoted run, which the dequoting step takes out before the cut",
  "  a call in a heredoc body, which that step does not take out, so data naming biome is",
  "    refused as though it were a command",
  "",
  "ALSO REFUSED ELSEWHERE:",
  "  A write through the Write or Edit tool is refused by `block-akasha-edits`. A write through",
  "  `Bash` is reached by neither, which that hook states as its own gap.",
  "",
  "The absence of a tool from this list is NOT a finding that it is safe. It is unexamined.",
  "Do not close a gap here by adding the tool. A denylist over an open hazard family teaches its",
  "own holes: the refusal is what sends a reader looking for the neighbouring tool it did not",
  "name, and a longer list is a longer search prompt. A gap found here is evidence that this",
  "guard cannot close its class, not an invitation to extend it.",
  "",
  `Printed by \`${HOOK}.agent-hook.code.ts ${SCOPE_FLAG}\`, which is the one place this stands:`,
  "it is what the program says about itself, held as text it prints rather than as a comment.",
]

function ranBy(words: readonly string[]): string | null {
  for (const one of words) {
    if (one.startsWith("-")) continue
    return basenameOf(one)
  }
  return null
}

export function biomeIn(segment: string): boolean {
  const words = wordsOf(segment).filter((one) => !ASSIGNMENT.test(one) && !SETTING_UP.includes(one))
  const head = words[0]
  if (head === undefined) return false
  const named = basenameOf(head)
  if (named === BIOME) return true
  return THROUGH.includes(named) && ranBy(words.slice(1)) === BIOME
}

export function refusalIn(command: string, from: string, root: string): string | null {
  const at = from.trim() === "" ? root : resolve(from)
  if (at !== root && !at.startsWith(`${root}${sep}`)) return null
  for (const segment of segmentsOf(command)) {
    if (biomeIn(segment)) return REFUSAL
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
  const root = rootOf(import.meta.path)
  const reason = refusalIn(read.command, fromIn(raw), root)
  return said(reason === null ? STANDING_ASIDE : refusing(reason))
}

if (import.meta.main) process.exit(await main())
