import { dirname } from "node:path"
import type { Standing } from "akasha/checks/code-checks/pages/folder-matches-a-shape/folder-shapes/folder-shape.page-type.ts"
import { ofBookSections } from "akasha/checks/code-checks/pages/folder-matches-a-shape/modules/book-sections/book-sections.module.code.ts"

export const HOLDS = ["sections"]

const BOOK = "alan-book"

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
  said.push(...ofBookSections(standing, slugIn(holding)))
  return said
}
