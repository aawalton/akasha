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

export function initiativesDrawn(root: string): readonly InitiativeRow[] {
  const standing = everyOfType(root, PAGE_TYPE)
  const slugById = new Map<string, string>()
  for (const one of standing) {
    const slug = slugIn(one.path)
    if (slug !== null) slugById.set(one.id, slug)
  }
  const drawn: InitiativeRow[] = []
  for (const one of standing) {
    const slug = slugById.get(one.id)
    if (slug === undefined) continue
    const named = idsNaming(root, one.id, PARENT)
    const only = named.length === 1 ? named[0] : undefined
    drawn.push({
      slug,
      path: one.path,
      parent: only === undefined ? null : (slugById.get(only) ?? null),
    })
  }
  return drawn
}
