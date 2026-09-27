import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const PARTED_BY = "/"

const NAME_HOLDS = 255

const NAME_TAKES = 0x20

const SHOWN = 40

const RUN_OF_SPACE = /\s+/g

const BYTES = new TextEncoder()

const PAGE_ENDING = ".ts"

const UNTAKEN = "is no ending a file beside a page takes"

export function shownAs(held: string): string {
  if (held.length <= SHOWN) return `\`${held}\``
  return `${held.length} characters opening \`${held.slice(0, SHOWN).replace(RUN_OF_SPACE, " ")}\``
}

function offAName(held: string): boolean {
  for (let at = 0; at < held.length; at += 1) {
    if ((held.codePointAt(at) ?? NAME_TAKES) < NAME_TAKES) return true
  }
  return false
}

export function endingWhy(held: string, name: string): string | null {
  if (held === "") return "names nothing"
  if (held.includes(PARTED_BY)) return "names a folder rather than an ending"
  if (offAName(held)) return "holds a character no file name takes"
  const made = BYTES.encode(name).length
  if (made > NAME_HOLDS) {
    return `makes a name of ${made} bytes, past the ${NAME_HOLDS} a file name holds`
  }
  return null
}

export function endingRefused(
  key: string,
  propertySlug: string,
  at: string,
  held: unknown
): string | null {
  const names = `\`${key}\` is held in a file beside the page, so what a page states under it names that file's ending`
  const instead = `Write that file at a path of its own and leave \`${key}\` naming the ending.`
  if (typeof held !== "string") {
    return `${names}, and this write hands over a ${typeof held} rather than an ending. ${instead}`
  }
  if (!at.endsWith(PAGE_ENDING)) return null
  const stem = at.slice(at.lastIndexOf(PARTED_BY) + 1, -PAGE_ENDING.length)
  const why =
    endingWhy(held, `${stem}.${propertySlug}.${held}`) ??
    (besideAt(at, propertySlug, held) === null ? UNTAKEN : null)
  if (why === null) return null
  return `${names}, and this write hands over ${shownAs(held)}, which ${why}. ${instead}`
}
