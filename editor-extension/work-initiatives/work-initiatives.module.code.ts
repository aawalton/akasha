import {
  everyOfType,
  idsNaming,
  typeSlugOf,
} from "../../pages/indexes/index-reading/index-reading.module.code.ts"
import { partedIn } from "../../pages/pages/file-name/page-file-name.module.code.ts"
import { valueAt } from "../../pages/pages/value/page-value.module.code.ts"

const INITIATIVE_TYPE = "01a04e58-5735-72b4-b945-56366461c776"

const PARENT = "parent-slug"

const PERSONA = "personaSlug"

export type InitiativeRow = {
  readonly slug: string
  readonly path: string
  readonly parent: string | null
  readonly persona: string | null
}

function slugIn(path: string, typeSlug: string): string | null {
  const said = partedIn(path)
  if (said === null || said.sections.length > 0 || said.pageType !== typeSlug) return null
  return said.slug
}

function personaAt(root: string, path: string): string | null {
  const value = valueAt(path, root)
  if (value === null) return null
  const said = value[PERSONA]
  return typeof said === "string" && said !== "" ? said : null
}

export function initiativesDrawn(root: string): readonly InitiativeRow[] {
  const typeSlug = typeSlugOf(root, INITIATIVE_TYPE)
  const pages = everyOfType(root, typeSlug)
  const slugById = new Map<string, string>()
  for (const one of pages) {
    const slug = slugIn(one.path, typeSlug)
    if (slug !== null) slugById.set(one.id, slug)
  }
  const edges = [...pages].flatMap((one) => {
    const parent = slugById.get(one.id)
    if (parent === undefined) return []
    return [...idsNaming(root, one.id, PARENT)].flatMap((naming) => {
      const child = slugById.get(naming)
      return child === undefined ? [] : [{ child, parent }]
    })
  })
  const parentsOf = Map.groupBy(edges, (one) => one.child)
  const drawn: InitiativeRow[] = []
  for (const one of pages) {
    const slug = slugById.get(one.id)
    if (slug === undefined) continue
    const named = parentsOf.get(slug) ?? []
    drawn.push({
      slug,
      path: one.path,
      parent: named.length === 1 ? (named[0]?.parent ?? null) : null,
      persona: personaAt(root, one.path),
    })
  }
  return drawn
}
