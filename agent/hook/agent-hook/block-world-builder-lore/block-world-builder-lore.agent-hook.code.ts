import { realpathSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import {
  type Answer,
  inputIn,
  LET_THROUGH,
  ranAsJudged,
  refusing,
  toldOf,
} from "akasha/agent/hook/modules/answer/hook-answer.module.code.ts"
import { shellReaches } from "akasha/agent/hook/modules/lore-shell-reach/lore-shell-reach.module.code.ts"
import { insideOf, settled } from "akasha/agent/hook/modules/settling/settling.module.code.ts"
import { seatIn } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import {
  scratchIn,
  sessionsIn,
} from "akasha/agent/modules/withheld-hiding/withheld-hiding.module.code.ts"
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

const TRANSCRIPT = "transcript_path"

const SESSION = "session_id"

const SESSION_NAME = /^[\w-]+$/

export const REFUSAL = toldOf(HOOK, WITHHELD)

export const AWAY = toldOf(HOOK, [
  "This reads outside the checkout and your own session, and your seat is a game master's, so it",
  "is refused. Another session's transcript, a scratchpad or a copy anywhere else may hold a lore",
  "page the world builder holds.",
  "",
  "Read and search inside the checkout, your own session's transcript folder, or your scratchpad.",
])

export const SCOPE: readonly string[] = [
  `${HOOK} refuses a call by a game master's seat, or a subagent under one, that reaches a lore`,
  "page the world builder holds. Every other caller is let through before any path is looked at.",
  "",
  "WHO IS A GAME MASTER. The seat `AGENT_ID` names is one the game master role's references name",
  "by role. The pages withheld are the ones the world builder disclosure's references name by",
  "disclosure, so a page moved down to game-master disclosure is let through from then on.",
  "",
  "WHAT IS REFUSED:",
  "  - a Read or a Grep landing, links followed, outside the checkout and the seat's own session:",
  "    the transcript the payload names, the folder beside it named for the session, and the",
  "    scratch folders named for the session",
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
  "  - a copy of a withheld page under another name, in the checkout or the seat's own session",
  "  - an MCP tool, a web fetch, or any tool other than Read, Grep and Bash",
  "",
  `Printed by \`${HOOK}.agent-hook.code.ts --scope\`, which is where this sits: it is what the`,
  "program says about itself, held as the text it prints rather than as a comment.",
]

function saidIn(input: Readonly<Record<string, unknown>> | null, key: string): string {
  return textAt(input, key) ?? ""
}

function ownIn(payload: Record<string, unknown>, scratch: string): readonly string[] {
  const transcript = saidIn(payload, TRANSCRIPT)
  const session = saidIn(payload, SESSION)
  if (transcript === "" || !SESSION_NAME.test(session)) return []
  return [transcript, join(dirname(transcript), session), ...sessionsIn(scratch, session)]
}

function keptTo(at: string, root: string, own: readonly string[]): boolean {
  const found = settled(at)
  return [root, ...own].some((one) => insideOf(settled(one), found))
}

function reasonFor(
  payload: Record<string, unknown>,
  root: string,
  withheld: readonly string[],
  scratch: string
): string | null {
  const input = inputIn(payload)
  const from = textAt(payload, FROM) ?? root
  const tool = textAt(payload, TOOL)
  if (tool === BASH) {
    return shellReaches(saidIn(input, COMMAND), from, root, withheld) ? REFUSAL : null
  }
  if (tool !== READ && tool !== GREP) return null
  const said = saidIn(input, tool === READ ? FILE_PATH : PATH)
  if (tool === READ && said === "") return null
  const at = resolve(from, said === "" ? HERE : said)
  if (!keptTo(at, root, ownIn(payload, scratch))) return AWAY
  const reaches = tool === READ ? withheldAt(at, withheld) : reachesWithheld(at, root, withheld)
  return reaches ? REFUSAL : null
}

export function refusalFor(
  payload: Record<string, unknown>,
  root: string,
  agentId: string | null,
  scratch: string = scratchIn(process.getuid?.() ?? 0)
): string | null {
  const withheld = withheldFor(root, agentId)
  if (withheld.length === 0) return null
  return reasonFor(payload, root, withheld, scratch)
}

function judgedFor(payload: Record<string, unknown>): Answer {
  const root = rootOf(realpathSync(import.meta.path))
  const reason = refusalFor(payload, root, seatIn(process.env))
  return reason === null ? LET_THROUGH : refusing(reason)
}

async function ran(): Promise<number> {
  return await ranAsJudged(HOOK, SCOPE, judgedFor)
}

if (import.meta.main) process.exit(await ran())
