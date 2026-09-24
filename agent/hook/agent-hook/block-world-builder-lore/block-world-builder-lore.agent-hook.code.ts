import { realpathSync } from "node:fs"
import { resolve } from "node:path"
import {
  type Answer,
  inputIn,
  LET_THROUGH,
  ranAsJudged,
  refusing,
  toldOf,
} from "akasha/agent/hook/modules/answer/hook-answer.module.code.ts"
import { shellReaches } from "akasha/agent/hook/modules/lore-shell-reach/lore-shell-reach.module.code.ts"
import { seatIn } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import { textAt } from "akasha/code/type/narrowing/modules/text-at/text-at.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import {
  reachesWithheld,
  WITHHELD,
  withheldAt,
  withheldFor,
} from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.code.ts"

const HOOK = "block-world-builder-lore"

const TOOL = "tool_name"

const FROM = "cwd"

const READ = "Read"

const GREP = "Grep"

const BASH = "Bash"

const FILE_PATH = "file_path"

const PATH = "path"

const COMMAND = "command"

const HERE = "."

export const REFUSAL = toldOf(HOOK, WITHHELD)

export const SCOPE: readonly string[] = [
  `${HOOK} refuses a call by a game master's seat, or a subagent under one, that reaches a lore`,
  "page the world builder holds. Every other caller is let through before any path is looked at.",
  "",
  "WHO IS A GAME MASTER. The seat `AGENT_ID` names is one the game master role's references name",
  "by role. The pages withheld are the ones the world builder disclosure's references name by",
  "disclosure, so a page moved down to game-master disclosure is let through from then on.",
  "",
  "WHAT IS REFUSED:",
  "  - a Read landing, links followed, on a withheld page or a copy of one in any tree",
  "  - a Grep whose path, or the folder it runs in when it names none, holds one",
  "  - a Bash line naming a withheld page's path or file name, a glob matching one, a reader",
  "    handed a folder holding one, a recursive search run in such a folder, or a git call",
  "    printing bodies across a tree that holds one, with no path limiting it away",
  "",
  "NOT REACHED. Each is outside what this judges:",
  "  - Glob and a plain `ls`, which show names and no body",
  "  - a path the shell builds as it runs: a variable, a substitution, a quoted run with a space",
  "  - a program reading a path its own code names: an interpreter, a script, a compiled tool",
  "  - a git history naming a withheld page only through an object id, or a pathspec glob",
  "  - a copy of a withheld page under another name, outside this checkout and its trees",
  "  - an MCP tool, a web fetch, or any tool other than Read, Grep and Bash",
  "",
  `Printed by \`${HOOK}.agent-hook.code.ts --scope\`, which is where this sits: it is what the`,
  "program says about itself, held as the text it prints rather than as a comment.",
]

function saidIn(input: Readonly<Record<string, unknown>> | null, key: string): string {
  return textAt(input, key) ?? ""
}

export function reachedBy(
  payload: Record<string, unknown>,
  root: string,
  withheld: readonly string[]
): boolean {
  const input = inputIn(payload)
  const from = textAt(payload, FROM) ?? root
  const tool = textAt(payload, TOOL)
  if (tool === READ) {
    const at = saidIn(input, FILE_PATH)
    return at !== "" && withheldAt(resolve(from, at), withheld)
  }
  if (tool === GREP) {
    const at = saidIn(input, PATH)
    return reachesWithheld(resolve(from, at === "" ? HERE : at), root, withheld)
  }
  if (tool === BASH) return shellReaches(saidIn(input, COMMAND), from, root, withheld)
  return false
}

export function refusalFor(
  payload: Record<string, unknown>,
  root: string,
  agentId: string | null
): string | null {
  const withheld = withheldFor(root, agentId)
  if (withheld.length === 0) return null
  return reachedBy(payload, root, withheld) ? REFUSAL : null
}

export function judgedFor(payload: Record<string, unknown>): Answer {
  const root = rootOf(realpathSync(import.meta.path))
  const reason = refusalFor(payload, root, seatIn(process.env))
  return reason === null ? LET_THROUGH : refusing(reason)
}

async function ran(): Promise<number> {
  return await ranAsJudged(HOOK, SCOPE, judgedFor)
}

if (import.meta.main) process.exit(await ran())
