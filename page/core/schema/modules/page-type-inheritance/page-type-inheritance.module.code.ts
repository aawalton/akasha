import { slugIn } from "akasha/page/modules/address/page-address.module.code.ts"

export interface PageTypeForInheritance {
  readonly _id: string
  readonly properties?: Record<string, unknown>
}

function parentIdsOf(
  pt: PageTypeForInheritance,
  idBySlug: ReadonlyMap<string, string>
): readonly string[] {
  const said = pt.properties?.extends
  const named = Array.isArray(said) ? said : []
  const found: string[] = []
  for (const one of named) {
    if (typeof one !== "string" || one === "") continue
    const bare = slugIn(one)
    if (bare === null) continue
    const parentId = idBySlug.get(bare)
    if (parentId !== undefined) found.push(parentId)
  }
  return found
}

export function pageTypeChain(
  pageTypes: ReadonlyArray<PageTypeForInheritance>,
  slug: string
): readonly string[] {
  const bySlug = new Map<string, PageTypeForInheritance>()
  for (const pt of pageTypes) {
    const own = pt.properties?.slug
    if (typeof own === "string" && own !== "") bySlug.set(own, pt)
  }
  const found: string[] = []
  const seen = new Set<string>()
  const waiting: string[] = [slug]
  for (let at = 0; at < waiting.length; at += 1) {
    const own = waiting[at]
    if (own === undefined || own === "" || seen.has(own)) continue
    seen.add(own)
    found.push(own)
    const said = bySlug.get(own)?.properties?.extends
    const named = Array.isArray(said) ? said : []
    for (const one of [...named].reverse()) {
      if (typeof one !== "string" || one === "") continue
      const bare = slugIn(one)
      if (bare !== null) waiting.push(bare)
    }
  }
  return found
}

export function resolveDescendantPageTypeIds(
  pageTypes: ReadonlyArray<PageTypeForInheritance>,
  targetId: string
): Set<string> {
  const idBySlug = new Map<string, string>()
  for (const pt of pageTypes) {
    const slug = pt.properties?.slug
    if (typeof slug === "string" && slug.length > 0 && pt._id.length > 0) {
      idBySlug.set(slug, pt._id)
    }
  }

  const parentsOf = new Map<string, readonly string[]>()
  for (const pt of pageTypes) {
    const parentIds = parentIdsOf(pt, idBySlug)
    if (parentIds.length > 0) parentsOf.set(pt._id, parentIds)
  }

  const reachesTarget = new Set<string>([targetId])
  const doesNotReach = new Set<string>()

  const reaches = (id: string, opened: Set<string>): boolean => {
    if (reachesTarget.has(id)) return true
    if (doesNotReach.has(id)) return false
    if (opened.has(id)) return false
    opened.add(id)
    let found = false
    for (const parentId of parentsOf.get(id) ?? []) {
      if (reaches(parentId, opened)) {
        found = true
        break
      }
    }
    opened.delete(id)
    if (found) reachesTarget.add(id)
    else doesNotReach.add(id)
    return found
  }

  const descendants = new Set<string>([targetId])
  for (const pt of pageTypes) {
    if (reaches(pt._id, new Set<string>())) descendants.add(pt._id)
  }

  return descendants
}
