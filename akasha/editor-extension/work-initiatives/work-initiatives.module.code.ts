import { everyOfType, idsNaming } from "../../pages-system/index/index-reading.module.code.ts"
import { namedIn } from "../../pages-system/page/page-file-name.module.code.ts"

const PAGE_TYPE = "initiative"

const PARENT = "parent-slug"

export type InitiativeRow = {
  readonly slug: string
  readonly path: string
  readonly parent: string | null
}

function slugIn(path: string): string | null {
  const said = namedIn(path)
  if (said === null || said.tail !== PAGE_TYPE) return null
  return said.stem
}

function held(into: Map<string, string[]>, key: string, value: string): void {
  const at = into.get(key)
  if (at === undefined) into.set(key, [value])
  else at.push(value)
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
      if (child !== undefined) held(parentsOf, child, parent)
    }
  }
  const drawn: InitiativeRow[] = []
  for (const one of standing) {
    const slug = slugById.get(one.id)
    if (slug === undefined) continue
    const named = parentsOf.get(slug) ?? []
    drawn.push({ slug, path: one.path, parent: named.length === 1 ? (named[0] ?? null) : null })
  }
  return drawn
}
