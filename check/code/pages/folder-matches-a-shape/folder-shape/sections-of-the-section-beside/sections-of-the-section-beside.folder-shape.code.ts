import { basename, dirname } from "node:path"
import type { Standing } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.ts"
import { ofCollectionParts } from "akasha/check/code/pages/folder-matches-a-shape/modules/collection-parts/collection-parts.module.code.ts"
import { addressIn, namedAs } from "akasha/page/modules/address/page-address.module.code.ts"

const BOOK = "alan-book"

const SECTION = "book-section"

const SECTIONS = [SECTION]

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
  said.push(...ofCollectionParts(standing, namedAs(SECTION, named, book), SECTIONS))
  return said
}
