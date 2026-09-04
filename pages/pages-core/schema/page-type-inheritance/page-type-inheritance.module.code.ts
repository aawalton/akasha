export interface PageTypeForInheritance {
  readonly _id: string
  readonly properties?: Record<string, unknown>
}

function slugAbove(named: string): string {
  const at = named.indexOf("/")
  return at === -1 ? named : named.slice(at + 1)
}

function parentIdsOf(
  pt: PageTypeForInheritance,
  idBySlug: ReadonlyMap<string, string>
): readonly string[] {
  const said = pt.properties?.extendsSlug
  const named = typeof said === "string" ? [said] : Array.isArray(said) ? said : []
  const found: string[] = []
  for (const one of named) {
    if (typeof one !== "string" || one === "") continue
    const parentId = idBySlug.get(slugAbove(one))
    if (parentId !== undefined) found.push(parentId)
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
