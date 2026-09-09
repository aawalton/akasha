import { partedIn } from "@akasha/pages/page-file-name"
import { missing, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/change-shadow/change-shadow.module.code.ts"

const RENAME_FILE_PAGES = "change-mechanical/rename-file-pages"

const PAGE_TYPE = "page-type"

const MOVED = "moved"

const SPACED = /\s+/

type Read = { readonly moved: Record<string, string> } | { readonly refused: string }

function readIn(said: string): Read {
  const moved: Record<string, string> = {}
  for (const line of said.split("\n")) {
    const one = line.trim()
    if (one === "") continue
    const words = one.split(SPACED)
    const at = words[0]
    const to = words[1]
    if (words.length !== 2 || at === undefined || to === undefined) {
      return { refused: `\`${one}\` is no path and slug parted by a space` }
    }
    const parted = partedIn(at)
    if (parted !== null && parted.sections.length === 0 && parted.pageType === PAGE_TYPE) {
      return {
        refused: `\`${at}\` is a page type, and \`rename-page-type\` renames one rather than this change`,
      }
    }
    moved[at] = to
  }
  return { moved }
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const said = given[MOVED]
  if (said === undefined) return refusing(missing(MOVED))
  const read = readIn(said)
  if ("refused" in read) return refusing(read.refused)
  return (await reach(world, RENAME_FILE_PAGES, { moved: read.moved })).said
}
