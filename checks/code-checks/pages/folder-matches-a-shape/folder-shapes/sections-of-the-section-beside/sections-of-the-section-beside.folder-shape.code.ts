import { basename, dirname } from "node:path"
import { addressIn, namedAs } from "@akasha/pages/page-address"
import { saidInside } from "../../../../../modules/shape-saying/shape-saying.module.code.ts"
import type { Standing } from "../folder-shape.page-type.ts"

const BOOK = "alan-book"

const SECTION = "book-section"

const ENDING = `.${SECTION}.ts`

const NOWHERE = "."

function bookOver(standing: Standing): string | null {
  let at = dirname(standing.folder)
  while (at !== "" && at !== NOWHERE) {
    for (const one of standing.holds(at)) {
      const address = addressIn(one)
      if (address.kind !== "qualified") continue
      if (standing.extending(address.pageTypeSlug, BOOK)) return address.slug
    }
    at = dirname(at)
  }
  return null
}

export function sectionsOfTheSectionBeside(standing: Standing): readonly string[] {
  const said: string[] = []
  const named = basename(standing.folder)
  const book = bookOver(standing)
  if (book === null) return [`no \`${BOOK}\` sits above this folder`]
  const beside = `${named}${ENDING}`
  if (!standing.under(dirname(standing.folder)).some((one) => basename(one) === beside)) {
    said.push(`no \`${beside}\` sits beside this folder for the folder to be named for`)
    return said
  }
  const holder = namedAs(SECTION, named, book)
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
    (one) => one.pageTypeSlug === SECTION && !standing.partOf(one).includes(holder)
  )
  if (loose.length > 0) {
    said.push(
      `${loose.length} sections here name \`${holder}\` nowhere as what holds them: ${saidInside(standing.folder, loose)}`
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
