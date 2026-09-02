import { colorRuleVariantSchema } from "@akasha/pages-core/schema/color-rule"
import type {
  PageResolverEntry,
  PageResolverValue,
} from "@akasha/pages-ui/contexts/page-resolver-context"
import type { PageWithProperties } from "@akasha/pages-ui/supabase/page-with-properties"

export function buildPageResolver(
  pageSets: readonly (readonly PageWithProperties[])[],
  opts?: { getDescendantSet?: (pageTypeId: string) => Set<string> }
): PageResolverValue {
  const byId = new Map<string, PageResolverEntry>()
  const flat: PageWithProperties[] = []
  for (const set of pageSets) {
    for (const page of set) {
      flat.push(page)
      const title = String(page.properties?.title ?? "")
      const color = colorRuleVariantSchema.safeParse(page.properties?.color)
      const sortOrder = page.properties?.sortOrder
      byId.set(page._id, {
        id: page._id,
        title,
        ...(color.success ? { color: color.data } : {}),
        ...(typeof sortOrder === "number" ? { sortOrder } : {}),
      })
    }
  }

  const getDescendantSet = opts?.getDescendantSet
  return {
    resolve: (id: string) => byId.get(id) ?? null,
    listPages: (pageTypeId?: string) => {
      if (pageTypeId == null || getDescendantSet == null) return Array.from(byId.values())
      const descendantSet = getDescendantSet(pageTypeId)
      return flat
        .filter((p) => {
          const pid = p.properties?.pageTypeId
          return typeof pid === "string" && descendantSet.has(pid)
        })
        .map((p) => byId.get(p._id))
        .filter((entry): entry is PageResolverEntry => entry != null)
    },
  } satisfies PageResolverValue
}
