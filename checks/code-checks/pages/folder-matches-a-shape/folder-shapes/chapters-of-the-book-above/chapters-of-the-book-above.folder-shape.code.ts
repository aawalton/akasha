import { basename, dirname } from "node:path"
import { saidInside } from "../../../../../modules/shape-saying/shape-saying.module.code.ts"
import type { Standing } from "../folder-shape.page-type.ts"

const CHAPTERS = "chapters"

const BOOK = "alan-book"

const CHAPTER = "book-chapter"

function slugIn(held: string): string {
  const at = held.indexOf("/")
  return at === -1 ? held : held.slice(at + 1)
}

function typeIn(held: string): string {
  const at = held.indexOf("/")
  return at === -1 ? "" : held.slice(0, at)
}

export function chaptersOfTheBookAbove(standing: Standing): readonly string[] {
  const said: string[] = []
  const named = basename(standing.folder)
  if (named !== CHAPTERS) said.push(`it is named \`${named}\` rather than \`${CHAPTERS}\``)
  const above = standing.holds(dirname(standing.folder))
  if (above === null) {
    said.push("the folder above holds no page of its own")
    return said
  }
  if (!standing.extending(typeIn(above), BOOK)) {
    said.push(`the page above is a \`${typeIn(above)}\` rather than a \`${BOOK}\``)
    return said
  }
  const book = slugIn(above)
  if (standing.strays.length > 0) {
    said.push(
      `${standing.strays.length} files are neither a chapter nor a file beside one: ${saidInside(standing.folder, standing.strays)}`
    )
  }
  if (standing.subfolders.length > 0) {
    said.push(
      `${standing.subfolders.length} folders sit in it, and every chapter of \`${book}\` sits in it directly: ${saidInside(standing.folder, standing.subfolders)}`
    )
  }
  const other = standing.pages.filter((one) => one.pageTypeSlug !== CHAPTER)
  if (other.length > 0) {
    said.push(
      `${other.length} pages here are not of \`${CHAPTER}\`: ${saidInside(standing.folder, other)}`
    )
  }
  const loose = standing.pages.filter(
    (one) => one.pageTypeSlug === CHAPTER && !standing.partOf(one).includes(book)
  )
  if (loose.length > 0) {
    said.push(
      `${loose.length} chapters here name \`${book}\` nowhere as what holds them: ${saidInside(standing.folder, loose)}`
    )
  }
  const here = new Set<string>(standing.pages.map((one) => one.page ?? one.path))
  const stranded = standing.properties.filter((one) => !here.has(one.page ?? one.path))
  if (stranded.length > 0) {
    said.push(
      `${stranded.length} files sit beside no chapter here: ${saidInside(standing.folder, stranded)}`
    )
  }
  if (standing.pages.length === 0 && said.length === 0) said.push("it holds no chapter")
  return said
}
