import { join, relative, resolve } from "node:path"
import {
  ASIDE,
  commandIn,
  refusing,
  rootOf,
  STANDING_ASIDE,
  said,
} from "../../hook-answer.module.code.ts"
import { insideOf, settled } from "../../settling.module.code.ts"

const HOOK = "block-akasha-reads"

const SCOPE_FLAG = "--scope"

const FILE_PATH = "file_path"

const PAGES = "akasha"

export const SCOPE: readonly string[] = [
  "block-akasha-reads refuses a Read landing inside the akasha folder, and stands aside",
  "everywhere else.",
  "",
  "WHY. A write is refused for changing a file the record does not show the agent has read, and",
  "only a read the akasha system runs is recorded. A Read through the harness leaves no record, so",
  "an agent reading that way would be refused later with nothing to show for what it had read.",
  "The refusal names the call that does record one.",
  "",
  "CLOSED over the tool it judges. Read carries its target as a path in the structured tool input,",
  "so no shell reads it: there is no quoting, no substitution and nothing to parse, and therefore",
  "no second spelling of a path to miss. The path is resolved against the directory the call was",
  "made in, `.` and `..` are folded away, and every link on it is followed. What comes out is",
  "compared against the akasha folder resolved the same way.",
  "",
  "NOT REACHED. Each of these stands outside the class, and is not a hole inside it:",
  "  - Grep and Glob. A search is not a read: it shows what matched, never a body this hook could",
  "    hold anyone to having seen. They are not judged here, and what they show is recorded",
  "    nowhere.",
  "  - a shell read. `cat`, `head` and `sed -n` are Bash calls, and this hook is handed none.",
  "    They record nothing either, so a file read that way still stands as unread.",
  "  - `.git/data`. The index is derived from the pages and is nobody's required reading, so a",
  "    Read of it is let through. The edits hook guards writing it; this does not guard reading it.",
  "  - a path inside akasha that is a link pointing out of it. The read lands outside, so it is",
  "    stood aside. A path is judged by where it lands, never by how it is spelled.",
  "  - another checkout of this repository. The folder is taken from where this hook's own file",
  "    stands, so a second worktree's `akasha/` is a different folder and is not guarded from here.",
  "",
  "Printed by `block-akasha-reads.agent-hook.code.ts --scope`, which is where this stands: it is",
  "what the program says about itself, held as the text it prints rather than as a comment.",
]

function shownIn(root: string, at: string): string {
  const named = relative(root, at)
  return named === "" || !insideOf(root, at) ? at : named
}

export function refusalFor(shown: string): string {
  return [
    `${HOOK}: Read reaches \`${shown}\`, inside the akasha folder.`,
    "The akasha command reads that folder, and records the read. Only a read it records counts,",
    "and a write is refused for changing a file the record does not show you have read.",
    "",
    `  akasha read --file-path ${shown}`,
    "",
    "`--file-path` repeats, so several files come back from one call.",
    "",
    "LET THE OUTPUT REACH YOU. A read piped, redirected into a file, or sent to /dev/null is",
    "refused and records nothing, because what the record says is that the body reached you.",
    "A body you already hold comes back as one line rather than the file, and `--full` returns",
    "the body anyway.",
  ].join("\n")
}

export function refusalIn(filePath: string, from: string, root: string): string | null {
  if (filePath.trim() === "") return null
  const here = settled(root)
  const at = settled(resolve(from, filePath))
  return insideOf(settled(join(here, PAGES)), at) ? refusalFor(shownIn(here, at)) : null
}

function fromIn(raw: string): string {
  try {
    const payload: unknown = JSON.parse(raw)
    if (payload === null || typeof payload !== "object" || Array.isArray(payload)) {
      return process.cwd()
    }
    const held = (payload as Record<string, unknown>)["cwd"]
    return typeof held === "string" && held !== "" ? held : process.cwd()
  } catch {
    return process.cwd()
  }
}

async function main(): Promise<number> {
  if (Bun.argv[2] === SCOPE_FLAG) {
    process.stdout.write(`${SCOPE.join("\n")}\n`)
    return ASIDE
  }
  const raw = await Bun.stdin.text()
  const read = commandIn(raw, FILE_PATH, HOOK)
  if ("answer" in read) return said(read.answer)
  const reason = refusalIn(read.command, fromIn(raw), rootOf(import.meta.path))
  return said(reason === null ? STANDING_ASIDE : refusing(reason))
}

if (import.meta.main) process.exit(await main())
