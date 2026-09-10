import { dirname } from "node:path"
import { saidInside } from "../../../../../modules/shape-saying/shape-saying.module.code.ts"
import type { Standing } from "../folder-shape.page-type.ts"

export const HOLDS = ["sections"]

const BOOK = "alan-book"

const SECTION = "book-section"

function slugIn(held: string): string {
  const at = held.indexOf("/")
  return at === -1 ? held : held.slice(at + 1)
}

function typeIn(held: string): string {
  const at = held.indexOf("/")
  return at === -1 ? "" : held.slice(0, at)
}

export function sectionsOfTheBookAbove(standing: Standing): readonly string[] {
  const said: string[] = []
  const above = standing.holds(dirname(standing.folder))
  const first = above[0]
  if (first === undefined) {
    said.push("the folder above holds no page of its own")
    return said
  }
  const holding = above.find((one) => standing.extending(typeIn(one), BOOK))
  if (holding === undefined) {
    said.push(`the page above is a \`${typeIn(first)}\` rather than a \`${BOOK}\``)
    return said
  }
  const book = slugIn(holding)
  if (standing.strays.length > 0) {
    said.push(
      `${standing.strays.length} files are neither a section nor a file beside one: ${saidInside(standing.folder, standing.strays)}`
    )
  }
  const other = standing.pages.filter((one) => one.pageTypeSlug !== SECTION)
  if (other.length > 0) {
    said.push(
      `${other.length} pages here are not of \`${SECTION}\`: ${saidInside(standing.folder, other)}`
    )
  }
  const loose = standing.pages.filter(
    (one) => one.pageTypeSlug === SECTION && !standing.partOf(one).includes(book)
  )
  if (loose.length > 0) {
    said.push(
      `${loose.length} sections here name \`${book}\` nowhere as what holds them: ${saidInside(standing.folder, loose)}`
    )
  }
  const here = new Set<string>(standing.pages.map((one) => one.page ?? one.path))
  const stranded = standing.properties.filter((one) => !here.has(one.page ?? one.path))
  if (stranded.length > 0) {
    said.push(
      `${stranded.length} files sit beside no section here: ${saidInside(standing.folder, stranded)}`
    )
  }
  if (standing.pages.length === 0 && said.length === 0) said.push("it holds no section")
  return said
}
