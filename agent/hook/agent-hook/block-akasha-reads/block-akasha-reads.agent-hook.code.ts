import { realpathSync } from "node:fs"
import { homedir } from "node:os"
import { join, relative, resolve } from "node:path"
import {
  type Answer,
  inputIn,
  LET_THROUGH,
  ranAsJudged,
  refusing,
} from "akasha/agent/hook/modules/answer/hook-answer.module.code.ts"
import {
  type Shown,
  shellShows,
} from "akasha/agent/hook/modules/checkout-shell-reach/checkout-shell-reach.module.code.ts"
import { shownIn } from "akasha/agent/hook/modules/path-showing/path-showing.module.code.ts"
import { insideOf, settled } from "akasha/agent/hook/modules/settling/settling.module.code.ts"
import { textAt } from "akasha/code/type/narrowing/modules/text-at/text-at.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { image } from "akasha/infrastructure/inference/generation/image/image.page-type.ts"
import { imageBytes } from "akasha/infrastructure/inference/generation/image/properties/image-bytes.file-property.ts"
import { INDEX_AT } from "akasha/page/index/modules/surface/index-surface.module.code.ts"
import {
  FIRST_PART,
  partedIn,
  sectionedIn,
} from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const HOOK = "block-akasha-reads"

const TOOL = "tool_name"

const FROM = "cwd"

const READ = "Read"

const GREP = "Grep"

const BASH = "Bash"

const FILE_PATH = "file_path"

const PATH = "path"

const PATTERN = "pattern"

const COMMAND = "command"

const OUTPUT_MODE = "output_mode"

const CONTENT = "content"

const HERE = "."

const HOME = "~"

const UNDER_HOME = "~/"

const QUOTE = "'"

const PATTERN_SAID = "PATTERN"

const BYTES_PROPERTY = `file-property/${imageBytes.slug}`

const BYTES_DECLARED = image.properties.find((one) => one.pageProperty === BYTES_PROPERTY)

const BYTES_UNCOMMITTED =
  BYTES_DECLARED !== undefined && "uncommitted" in BYTES_DECLARED && BYTES_DECLARED.uncommitted

const BYTES_ENDINGS: readonly string[] = imageBytes.extensions

export const SCOPE: readonly string[] = [
  "block-akasha-reads refuses a call showing the body of a file inside this checkout, or lines of",
  "one, where no read record would show what it showed, and stands aside everywhere else.",
  "",
  "WHY. A write is refused for changing a file the record does not show the agent has read, and",
  "only a read or a search the akasha system runs is recorded. A body seen any other way leaves no",
  "record, so the body an agent has seen would not be the body its record shows. Each refusal names",
  "the call that records what it shows: `akasha read` for a whole file, `akasha search` for lines.",
  "",
  "JUDGED:",
  "  - Read. Its path is resolved against the directory the call was made in, with a leading `~` as",
  "    the home folder, `.` and `..` folded away and every link followed, and compared against the",
  "    checkout root resolved the same way. Nothing is parsed, so no spelling of a path is missed.",
  "  - Grep with output_mode `content`, where its path, or the folder it runs in when it names none,",
  "    lands inside the checkout or holds it. The refusal names `akasha search`.",
  "  - Bash, read by checkout-shell-reach on lore-shell-reach's list of programs reading files: a",
  "    reader such as `cat`, `head`, `tail`, `sed`, `less` or `jq` handed a file inside the checkout;",
  "    a search such as `rg` or `grep` showing lines of one, or run recursively in a folder reaching",
  "    it; a reader fed names by a line listing the checkout; and git showing a file's body at HEAD,",
  "    in the index or on disk, through `show` or `cat-file` of HEAD:path or :path, `blame`, `grep`,",
  "    or a `diff` reaching the files on disk.",
  "",
  "LET THROUGH, since none shows a body: a Grep with output_mode `files_with_matches` or `count`;",
  "`rg -l`, `grep -l`, `git grep -l` and other searches printing only paths or counts; `ls`, `wc`,",
  "`find`, `cp` and other programs that list, count or copy; `git status`, `git log`, `git show` of a",
  "commit, a file at any other revision, and `git diff --stat` or a diff between two revisions,",
  "which are history; akasha's own calls; and any read of a file outside this checkout.",
  "",
  "NOT REACHED. Each of these is outside the class, and is not a hole inside it:",
  "  - Glob. It answers paths and never a body, so it is let through and records nothing.",
  "  - a path the shell builds as it runs: a variable, a substitution, a quoted run with a space.",
  "  - a program reading a path its own code names: an interpreter, a script, a compiled tool.",
  `  - \`${INDEX_AT}\`. The index is derived from the pages and is nobody's required reading, so a`,
  "    read or search of it is let through. The edits hook guards writing it; this does not guard",
  "    reading it.",
  "  - an image's bytes. The file an image page keeps its picture in is a picture, not a page body,",
  "    and `akasha read` answers text. It is told by the name the image page type declares for its",
  "    bytes: that property's slug, whether it is uncommitted, and the endings it is held under.",
  "  - a path inside akasha that is a link pointing out of it. The read lands outside, so it is",
  "    stood aside. A path is judged by where it lands, never by how it is spelled.",
  "  - another checkout of this repository. The folder is taken from where this hook's own file",
  "    sits, so a second worktree's `akasha/` is a different folder and is not guarded from here.",
  "  - an MCP tool, a web fetch, or any tool other than Read, Grep and Bash.",
  "",
  "Printed by `block-akasha-reads.agent-hook.code.ts --scope`, which is where this sits: it is",
  "what the program says about itself, held as the text it prints rather than as a comment.",
]

const REACHING_YOU = [
  "LET THE OUTPUT REACH YOU. A read or a search showing lines is refused and records nothing where",
  "its output goes to a pipe, to /dev/null, or into a file this redirect alone opened, because what",
  "the record says is that the body reached you.",
]

const LET_THROUGH_SAID = [
  "Let through, since none shows a body: `rg -l`, `grep -l` and `git grep -l`, which print paths;",
  "`ls`, `wc`, `find`, `git status`, `git log` and `git diff --stat`; and any read outside this",
  "checkout, such as the scratchpad under /var/tmp.",
]

function quoted(said: string): string {
  return `${QUOTE}${said.split(QUOTE).join(`${QUOTE}\\${QUOTE}${QUOTE}`)}${QUOTE}`
}

function withinOf(root: string, at: string): string {
  const said = relative(root, at)
  return said === "" || !insideOf(root, at) ? "" : ` --within ${said}`
}

function readRefusal(shown: string): string {
  return [
    `${HOOK}: Read reaches \`${shown}\`, inside this checkout.`,
    "The akasha command reads that folder, and records the read. Only a read it records counts,",
    "and a write is refused for changing a file the record does not show you have read.",
    "",
    `  akasha read --file-path ${shown}`,
    "",
    "`--file-path` repeats, so several files come back from one call.",
    "",
    ...REACHING_YOU,
    "A body you already hold comes back as one line rather than the file, and `--full` returns",
    "the body anyway.",
    "",
    "ONE ANSWER HOLDS 28000 BYTES and breaks no file partway, so a call naming more than it can",
    "answer comes back with an opening run of the files, names the rest as left unread, and exits 0",
    "either way. Only what came back is recorded.",
  ].join("\n")
}

function grepRefusal(root: string, at: string, pattern: string): string {
  const shown = shownIn(root, at)
  return [
    `${HOOK}: Grep shows lines of \`${shown}\`, inside this checkout.`,
    "The akasha search runs ripgrep there and records each file it showed lines of as seen in part,",
    "so the body you have seen is the body your record shows.",
    "",
    `  akasha search --pattern ${quoted(pattern)}${withinOf(root, at)}`,
    "",
    "It takes `--glob`, `--file-type`, `--context-lines` and `--ignore-case` as Grep takes glob,",
    "type, -C and -i, and `--within` repeats. A Grep whose output_mode is files_with_matches or",
    "count shows no line, and is let through. A whole file is read with",
    "`akasha read --file-path <path>`.",
    "",
    ...REACHING_YOU,
  ].join("\n")
}

function shellRefusal(root: string, shown: Shown): string {
  const path = shownIn(root, shown.at)
  const named = path === shown.at ? "<path>" : path
  const searching = `  akasha search --pattern ${PATTERN_SAID}${withinOf(root, shown.at)}`
  const opening =
    shown.how === "search"
      ? [`${HOOK}: \`${shown.by}\` shows lines of \`${path}\`, inside this checkout.`]
      : [`${HOOK}: \`${shown.by}\` shows the body of \`${path}\`, inside this checkout.`]
  const routes =
    shown.how === "search"
      ? [
          searching,
          "",
          "It takes `--glob`, `--file-type`, `--context-lines`, `--ignore-case` and",
          "`--files-only`, and `--within` repeats. A whole file is read with the akasha read:",
          "",
          `  akasha read --file-path ${named}`,
        ]
      : [
          `  akasha read --file-path ${named}`,
          "",
          "Lines matching a pattern come back from the akasha search:",
          "",
          searching,
        ]
  return [
    ...opening,
    "Only a read or a search the akasha system runs is recorded, and a write is refused for changing",
    "a file the record does not show you have read.",
    "",
    ...routes,
    "",
    ...LET_THROUGH_SAID,
    "",
    ...REACHING_YOU,
  ].join("\n")
}

export function imageBytesAt(path: string): boolean {
  if (BYTES_DECLARED === undefined) return false
  const said = partedIn(path)
  if (said === null || said.pageType !== image.slug || !BYTES_ENDINGS.includes(said.held)) {
    return false
  }
  const held = sectionedIn(said)
  return (
    held !== null &&
    held.propertySlug === imageBytes.propertySlug &&
    held.part === FIRST_PART &&
    held.uncommitted === BYTES_UNCOMMITTED
  )
}

export function homeExpanded(filePath: string, home: string): string {
  if (filePath === HOME) return home
  return filePath.startsWith(UNDER_HOME) ? join(home, filePath.slice(UNDER_HOME.length)) : filePath
}

function exemptIn(here: string): (at: string) => boolean {
  const index = settled(join(here, INDEX_AT))
  return (at: string): boolean => insideOf(index, at) || imageBytesAt(at)
}

export function refusalIn(
  filePath: string,
  from: string,
  root: string,
  home: string = homedir()
): string | null {
  if (filePath.trim() === "") return null
  const here = settled(root)
  const at = settled(resolve(from, homeExpanded(filePath, home)))
  if (!insideOf(here, at) || exemptIn(here)(at)) return null
  return readRefusal(shownIn(here, at))
}

function grepRefusalIn(
  input: Readonly<Record<string, unknown>> | null,
  from: string,
  root: string,
  home: string
): string | null {
  if (textAt(input, OUTPUT_MODE) !== CONTENT) return null
  const here = settled(root)
  const named = textAt(input, PATH) ?? ""
  const at = settled(resolve(from, homeExpanded(named === "" ? HERE : named, home)))
  const reaching = (insideOf(here, at) && !exemptIn(here)(at)) || insideOf(at, here)
  return reaching
    ? grepRefusal(here, insideOf(here, at) ? at : here, textAt(input, PATTERN) ?? "")
    : null
}

export function refusalFor(
  payload: Record<string, unknown>,
  root: string,
  home: string = homedir()
): string | null {
  const input = inputIn(payload)
  const from = textAt(payload, FROM) ?? root
  const tool = textAt(payload, TOOL)
  if (tool === READ) return refusalIn(textAt(input, FILE_PATH) ?? "", from, root, home)
  if (tool === GREP) return grepRefusalIn(input, from, root, home)
  if (tool !== BASH) return null
  const here = settled(root)
  const shown = shellShows(textAt(input, COMMAND) ?? "", from, here, exemptIn(here))
  return shown === null ? null : shellRefusal(here, shown)
}

export function judgedFor(payload: Record<string, unknown>): Answer {
  const reason = refusalFor(payload, rootOf(realpathSync(import.meta.path)))
  return reason === null ? LET_THROUGH : refusing(reason)
}

async function ran(): Promise<number> {
  return await ranAsJudged(HOOK, SCOPE, judgedFor)
}

if (import.meta.main) process.exit(await ran())
