import { basename, dirname, join, relative, resolve } from "node:path"
import { insideOf, settled } from "../../settling.module.code.ts"

const HOOK_NAME = "block-akasha-edits"

const UNREADABLE = 5

const REFUSED = 2

const PAGES = "akasha"

const INDEX = join(".git", "data")

const HOLD = "/var/tmp"

const UNNAMED = "unnamed"

const WRITE = "Write"

const EDIT = "Edit"

const NOTEBOOK_EDIT = "NotebookEdit"

export const JUDGED: readonly string[] = [WRITE, EDIT, NOTEBOOK_EDIT]

export const SCOPE: readonly string[] = [
  "block-akasha-edits refuses Write, Edit and NotebookEdit landing inside the akasha folder or",
  "inside `.git/data`, and stands aside everywhere else.",
  "",
  "CLOSED over the tools it judges. Each of these three carries its target as a path in the",
  "structured tool input — `file_path`, and `notebook_path` for NotebookEdit. No shell reads it, so",
  "there is no quoting, no substitution, no heredoc and nothing to parse, and therefore no second",
  "spelling of a path for this hook to miss. Every path is resolved against the working directory",
  "the call was made in, `.` and `..` are folded away, and every symlink on it is followed, down to",
  "one whose target does not exist yet. The result is compared against the roots resolved the same",
  "way. A call of one of these three tools that lands inside a guarded root is refused, and there is",
  "no such call that is not.",
  "",
  "NOT REACHED. Each of these stands outside the class, and is not a hole inside it:",
  "  - a write through `Bash`. A shell writes a file in more ways than can be named, and the Bash",
  "    hooks sample that open world. This hook is handed no Bash call and judges none.",
  "  - a tool this hook does not name. The closure is over Write, Edit and NotebookEdit, never over",
  "    writing. A fourth writing tool passes unjudged until it is named in `overTools`.",
  "  - a call carrying no path, or an empty one. There is nothing to resolve and nothing to refuse.",
  "  - a path inside akasha that is a symlink pointing out of it. The write lands outside, so it is",
  "    stood aside. A path is judged by where it lands, never by where it is spelled.",
  "  - a symlink swapped between this hook resolving the path and the tool writing it. The answer",
  "    is true of the tree as it stood when the hook ran.",
  "  - another checkout of this repository. The roots are taken from where this hook's own file",
  "    stands, so a second worktree's `akasha/` is a different folder and is not guarded from here.",
  "  - a change already committed. This hook judges a call before it runs and changes nothing.",
  "",
  "Printed by `block-akasha-edits.agent-hook.code.ts --scope`, which is where this stands: it is what",
  "the program says about itself, held as the text it prints rather than as a comment.",
]

export type Asked = {
  readonly toolName: string
  readonly filePath: string
  readonly from: string
}

export type Guarded = {
  readonly pages: string
  readonly index: string
}

export function rootOf(at: string): string {
  return resolve(dirname(at), "..", "..", "..", "..")
}

export function holdingIn(agentId: string): string {
  return join(HOLD, agentId.trim() === "" ? UNNAMED : agentId.trim())
}

export function guardedIn(root: string): Guarded {
  return { pages: settled(join(root, PAGES)), index: settled(join(root, INDEX)) }
}

function fieldOf(held: unknown, name: string): unknown {
  if (held === null || typeof held !== "object" || Array.isArray(held)) return undefined
  return (held as Record<string, unknown>)[name]
}

function texted(held: unknown): string {
  return typeof held === "string" ? held : ""
}

export function askedIn(raw: string): Asked | null {
  let payload: unknown
  try {
    payload = JSON.parse(raw)
  } catch {
    return null
  }
  if (payload === null || typeof payload !== "object" || Array.isArray(payload)) return null
  const input = fieldOf(payload, "tool_input")
  const named = texted(fieldOf(input, "file_path"))
  return {
    toolName: texted(fieldOf(payload, "tool_name")),
    filePath: named === "" ? texted(fieldOf(input, "notebook_path")) : named,
    from: texted(fieldOf(payload, "cwd")),
  }
}

function shownIn(root: string, at: string): string {
  const said = relative(root, at)
  return said === "" || !insideOf(root, at) ? at : said
}

function refusingPages(toolName: string, shown: string, name: string, held: string): string {
  if (toolName === NOTEBOOK_EDIT) {
    return [
      `${HOOK_NAME}: NotebookEdit lands on \`${shown}\`, inside the akasha folder.`,
      "There is no akasha command for a notebook, and the akasha folder holds none.",
    ].join("\n")
  }
  const door = "The akasha commands write that folder — they check the change and commit it."
  const why = '--message "<what this change is for>"'
  const bound = "only `akasha/` and `.git/data` are refused here."
  if (toolName === EDIT) {
    const was = join(held, `${HOOK_NAME}-${name}.old`)
    const now = join(held, `${HOOK_NAME}-${name}.new`)
    return [
      `${HOOK_NAME}: Edit lands on \`${shown}\`, inside the akasha folder.`,
      door,
      "",
      `Put the text you are replacing in ${was}, and the text replacing it in ${now}, then run:`,
      "",
      `  akasha edit --file-path ${shown} --old-file ${was} --new-file ${now} ${why}`,
      "",
      `Use Write for those two files — ${bound}`,
    ].join("\n")
  }
  const body = join(held, `${HOOK_NAME}-${name}`)
  return [
    `${HOOK_NAME}: Write lands on \`${shown}\`, inside the akasha folder.`,
    door,
    "",
    `Put the whole new body in ${body}, then run:`,
    "",
    `  akasha write --file-path ${shown} --content-file ${body} ${why}`,
    "",
    `Use Write for that file — ${bound}`,
  ].join("\n")
}

function refusingIndex(toolName: string, shown: string): string {
  return [
    `${HOOK_NAME}: ${toolName} lands on \`${shown}\`, inside the akasha index.`,
    "`.git/data` holds the index, and is guarded as the akasha folder is.",
    "The pages and the index are two halves of one store, so a hand-written index puts",
    "them out of step. Rebuild it instead:",
    "",
    "  akasha index refresh",
  ].join("\n")
}

export function refusalFor(
  asked: Asked,
  root: string,
  fallback: string,
  held: string
): string | null {
  if (!JUDGED.includes(asked.toolName)) return null
  if (asked.filePath.trim() === "") return null
  const from = asked.from === "" ? fallback : asked.from
  const at = settled(resolve(from, asked.filePath))
  const here = settled(root)
  const guarded = guardedIn(here)
  if (insideOf(guarded.pages, at)) {
    return refusingPages(asked.toolName, shownIn(here, at), basename(at), held)
  }
  if (insideOf(guarded.index, at)) return refusingIndex(asked.toolName, shownIn(here, at))
  return null
}

async function main(): Promise<number> {
  if (Bun.argv[2] === "--scope") {
    process.stdout.write(`${SCOPE.join("\n")}\n`)
    return 0
  }
  const raw = await Bun.stdin.text()
  if (raw.trim() === "") return 0
  const asked = askedIn(raw)
  if (asked === null) {
    process.stderr.write(
      `${HOOK_NAME}: the hook payload would not read, so nothing was judged and the call was not refused\n`
    )
    return UNREADABLE
  }
  const said = refusalFor(
    asked,
    rootOf(import.meta.path),
    process.cwd(),
    holdingIn(process.env["AGENT_ID"] ?? "")
  )
  if (said === null) return 0
  process.stderr.write(`${said}\n`)
  process.stdout.write(`${JSON.stringify({ decision: "block", reason: said }, null, 2)}\n`)
  return REFUSED
}

if (import.meta.main) process.exit(await main())
