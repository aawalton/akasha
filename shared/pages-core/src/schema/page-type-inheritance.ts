export interface PageTypeForInheritance {
  readonly _id: string
  readonly properties?: Record<string, unknown>
}

function parentIdOf(
  pt: PageTypeForInheritance,
  idBySlug: ReadonlyMap<string, string>
): string | undefined {
  const extendsSlug = pt.properties?.extendsSlug
  if (typeof extendsSlug === "string" && extendsSlug.length > 0) {
    const byExtendsSlug = idBySlug.get(extendsSlug)
    if (byExtendsSlug !== undefined) return byExtendsSlug
  }
  const parent = pt.properties?.extendsPageTypeId
  if (typeof parent === "string" && parent.length > 0) return parent
  return undefined
}

export function resolveDescendantPageTypeIds(
  pageTypes: ReadonlyArray<PageTypeForInheritance>,
  targetId: string
): Set<string> {
  const descendants = new Set<string>([targetId])

  const idBySlug = new Map<string, string>()
  for (const pt of pageTypes) {
    const slug = pt.properties?.slug
    if (typeof slug === "string" && slug.length > 0 && pt._id.length > 0) {
      idBySlug.set(slug, pt._id)
    }
  }

  const parentOf = new Map<string, string>()
  for (const pt of pageTypes) {
    const parentId = parentIdOf(pt, idBySlug)
    if (parentId !== undefined) parentOf.set(pt._id, parentId)
  }

  const reachesTarget = new Set<string>([targetId])
  const doesNotReach = new Set<string>()

  for (const pt of pageTypes) {
    if (descendants.has(pt._id)) continue

    const walk: string[] = []
    const visited = new Set<string>()
    let cursor: string | undefined = pt._id
    let verdict: "reaches" | "miss" | "cycle" = "miss"

    while (cursor !== undefined) {
      if (reachesTarget.has(cursor)) {
        verdict = "reaches"
        break
      }
      if (doesNotReach.has(cursor)) {
        verdict = "miss"
        break
      }
      if (visited.has(cursor)) {
        verdict = "cycle"
        break
      }
      visited.add(cursor)
      walk.push(cursor)
      cursor = parentOf.get(cursor)
    }

    if (verdict === "reaches") {
      for (const id of walk) {
        descendants.add(id)
        reachesTarget.add(id)
      }
    } else {
      for (const id of walk) {
        doesNotReach.add(id)
      }
    }
  }

  return descendants
}
