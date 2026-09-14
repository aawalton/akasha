import { basename, dirname } from "node:path"
import type { Standing } from "akasha/checks/code-checks/pages/folder-matches-a-shape/folder-shapes/folder-shape.page-type.ts"
import {
  ofBookSections,
  SECTION,
} from "akasha/checks/code-checks/pages/folder-matches-a-shape/modules/book-sections/book-sections.module.code.ts"
import { addressIn, namedAs } from "akasha/pages/modules/address/page-address.module.code.ts"

const BOOK = "alan-book"

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
  said.push(...ofBookSections(standing, namedAs(SECTION, named, book)))
  return said
}
