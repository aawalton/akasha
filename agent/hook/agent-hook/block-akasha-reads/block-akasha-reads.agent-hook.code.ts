import { homedir } from "node:os"
import { join, resolve } from "node:path"
import { ranAsHook } from "akasha/agent/hook/modules/answer/hook-answer.module.code.ts"
import { shownIn } from "akasha/agent/hook/modules/path-showing/path-showing.module.code.ts"
import { insideOf, settled } from "akasha/agent/hook/modules/settling/settling.module.code.ts"
import { image } from "akasha/infrastructure/inference/generation/image/image.page-type.ts"
import { imageBytes } from "akasha/infrastructure/inference/generation/image/properties/image-bytes.file-property.ts"
import { INDEX_AT } from "akasha/page/index/modules/surface/index-surface.module.code.ts"
import {
  FIRST_PART,
  partedIn,
  sectionedIn,
} from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const HOOK = "block-akasha-reads"

const FILE_PATH = "file_path"

const HOME = "~"

const UNDER_HOME = "~/"

const BYTES_PROPERTY = `file-property/${imageBytes.slug}`

const BYTES_DECLARED = image.properties.find((one) => one.pageProperty === BYTES_PROPERTY)

const BYTES_UNCOMMITTED =
  BYTES_DECLARED !== undefined && "uncommitted" in BYTES_DECLARED && BYTES_DECLARED.uncommitted

const BYTES_ENDINGS: readonly string[] = imageBytes.extensions

export const SCOPE: readonly string[] = [
  "block-akasha-reads refuses a Read landing anywhere inside this checkout, and stands aside",
  "everywhere else.",
  "",
  "WHY. A write is refused for changing a file the record does not show the agent has read, and",
  "only a read the akasha system runs is recorded. A Read through the harness leaves no record, so",
  "an agent reading that way would be refused later with nothing to show for what it had read.",
  "The refusal names the call that does record one.",
  "",
  "CLOSED over the tool it judges. Read carries its target as a path in the structured tool input,",
  "so no shell reads it: there is no quoting, no substitution and nothing to parse, and therefore",
  "no second spelling of a path to miss. A leading `~` is the home folder, as Read takes it. The",
  "path is resolved against the directory the call was made in, `.` and `..` are folded away,",
  "and every link on it is followed. What comes out is compared against the checkout root",
  "resolved the same way.",
  "",
  "NOT REACHED. Each of these is outside the class, and is not a hole inside it:",
  "  - Grep and Glob. A search is not a read: it shows what matched, never a body this hook could",
  "    hold anyone to having seen. They are not judged here, and what they show is recorded",
  "    nowhere.",
  "  - a shell read. `cat`, `head` and `sed -n` are Bash calls, and this hook is handed none.",
  "    They record nothing either, so a file read that way remains unread.",
  `  - \`${INDEX_AT}\`. The index is derived from the pages and is nobody's required reading, so a`,
  "    Read of it is let through. The edits hook guards writing it; this does not guard reading it.",
  "  - an image's bytes. The file an image page keeps its picture in is a picture, not a page body,",
  "    and `akasha read` answers text. It is told by the name the image page type declares for its",
  "    bytes: that property's slug, whether it is uncommitted, and the endings it is held under.",
  "  - a path inside akasha that is a link pointing out of it. The read lands outside, so it is",
  "    stood aside. A path is judged by where it lands, never by how it is spelled.",
  "  - another checkout of this repository. The folder is taken from where this hook's own file",
  "    sits, so a second worktree's `akasha/` is a different folder and is not guarded from here.",
  "",
  "Printed by `block-akasha-reads.agent-hook.code.ts --scope`, which is where this sits: it is",
  "what the program says about itself, held as the text it prints rather than as a comment.",
]

function refusalFor(shown: string): string {
  return [
    `${HOOK}: Read reaches \`${shown}\`, inside this checkout.`,
    "The akasha command reads that folder, and records the read. Only a read it records counts,",
    "and a write is refused for changing a file the record does not show you have read.",
    "",
    `  akasha read --file-path ${shown}`,
    "",
    "`--file-path` repeats, so several files come back from one call.",
    "",
    "LET THE OUTPUT REACH YOU. A read is refused and records nothing where its output goes to a",
    "pipe, to /dev/null, or into a file this redirect alone opened, because what the record says",
    "is that the body reached you.",
    "A body you already hold comes back as one line rather than the file, and `--full` returns",
    "the body anyway.",
    "",
    "ONE ANSWER HOLDS 28000 BYTES and breaks no file partway, so a call naming more than it can",
    "answer comes back with an opening run of the files, names the rest as left unread, and exits 0",
    "either way. Only what came back is recorded.",
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

export function refusalIn(
  filePath: string,
  from: string,
  root: string,
  home: string = homedir()
): string | null {
  if (filePath.trim() === "") return null
  const here = settled(root)
  const at = settled(resolve(from, homeExpanded(filePath, home)))
  if (!insideOf(here, at)) return null
  if (insideOf(settled(join(here, INDEX_AT)), at)) return null
  return imageBytesAt(at) ? null : refusalFor(shownIn(here, at))
}

async function ran(): Promise<number> {
  return await ranAsHook(HOOK, FILE_PATH, SCOPE, import.meta.path, refusalIn)
}

if (import.meta.main) process.exit(await ran())
