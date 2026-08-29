import { valueAt } from "../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import {
  everyOfType,
  idsNaming,
} from "../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { namedIn } from "../../pages-system/page/page-file-name/page-file-name.module.code.ts"
import { gather } from "../grouping/grouping.module.code.ts"

const PAGE_TYPE = "initiative"

const PARENT = "parent-slug"

const PERSONA = "personaSlug"

export type InitiativeRow = {
  readonly slug: string
  readonly path: string
  readonly parent: string | null
  readonly persona: string | null
}

function slugIn(path: string): string | null {
  const said = namedIn(path)
  if (said === null || said.tail !== PAGE_TYPE) return null
  return said.stem
}

function personaAt(root: string, path: string): string | null {
  const value = valueAt(path, root)
  if (value === null) return null
  const said = value[PERSONA]
  return typeof said === "string" && said !== "" ? said : null
}

export function initiativesDrawn(root: string): readonly InitiativeRow[] {
  const standing = everyOfType(root, PAGE_TYPE)
  const slugById = new Map<string, string>()
  for (const one of standing) {
    const slug = slugIn(one.path)
    if (slug !== null) slugById.set(one.id, slug)
  }
  const parentsOf = new Map<string, string[]>()
  for (const one of standing) {
    const parent = slugById.get(one.id)
    if (parent === undefined) continue
    for (const naming of idsNaming(root, one.id, PARENT)) {
      const child = slugById.get(naming)
      if (child !== undefined) gather(parentsOf, child, parent)
    }
  }
  const drawn: InitiativeRow[] = []
  for (const one of standing) {
    const slug = slugById.get(one.id)
    if (slug === undefined) continue
    const named = parentsOf.get(slug) ?? []
    drawn.push({
      slug,
      path: one.path,
      parent: named.length === 1 ? (named[0] ?? null) : null,
      persona: personaAt(root, one.path),
    })
  }
  return drawn
}
