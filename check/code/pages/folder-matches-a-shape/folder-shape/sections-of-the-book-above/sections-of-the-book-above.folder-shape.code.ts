import { dirname } from "node:path"
import type { Standing } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.ts"
import { ofCollectionParts } from "akasha/check/code/pages/folder-matches-a-shape/modules/collection-parts/collection-parts.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"

export const HOLDS = ["sections"]

const BOOK = "alan-book"

const SECTIONS = ["book-section"]

function typeIn(held: string): string {
  const address = addressIn(held)
  return address.kind === "qualified" || address.kind === "scoped" ? address.pageTypeSlug : ""
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
  said.push(...ofCollectionParts(standing, holding, SECTIONS))
  return said
}
