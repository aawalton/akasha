import { colorRuleVariantSchema } from "akasha/page/core/schema/modules/color-rule-variant/color-rule-variant.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { buildPageTypeSlugMaps } from "akasha/page/ui/component/modules/view-tab-content-href/view-tab-content-href.module.code.ts"
import type {
  PageResolverEntry,
  PageResolverValue,
} from "akasha/page/ui/context/modules/page-resolver-context/page-resolver-context.module.code.tsx"
import type { PageWithProperties } from "akasha/page/ui/supabase/modules/page-with-properties/page-with-properties.module.code.ts"

function textAt(page: PageWithProperties, key: string): string {
  const held = page.properties?.[key]
  return typeof held === "string" ? held : ""
}

function addressOf(page: PageWithProperties, slugById: ReadonlyMap<string, string>): string | null {
  const slug = textAt(page, "slug")
  if (slug === "") return null
  const stated = textAt(page, "pageTypeSlug")
  const pageTypeSlug = stated !== "" ? stated : (slugById.get(textAt(page, "pageTypeId")) ?? "")
  if (pageTypeSlug === "") return null
  return namedAs(pageTypeSlug, slug, null)
}

export function buildPageResolver(
  pageSets: readonly (readonly PageWithProperties[])[],
  opts?: { getDescendantSet?: (pageTypeId: string) => Set<string> }
): PageResolverValue {
  const byId = new Map<string, PageResolverEntry>()
  const byAddress = new Map<string, PageResolverEntry>()
  const flat: PageWithProperties[] = []
  for (const set of pageSets) {
    for (const page of set) flat.push(page)
  }
  const { slugById } = buildPageTypeSlugMaps(flat)
  for (const page of flat) {
    const title = String(page.properties?.title ?? "")
    const color = colorRuleVariantSchema.safeParse(page.properties?.color)
    const sortOrder = page.properties?.sortOrder
    const entry: PageResolverEntry = {
      id: page._id,
      title,
      ...(color.success ? { color: color.data } : {}),
      ...(typeof sortOrder === "number" ? { sortOrder } : {}),
    }
    byId.set(page._id, entry)
    const address = addressOf(page, slugById)
    if (address !== null) byAddress.set(address, entry)
  }

  const getDescendantSet = opts?.getDescendantSet
  return {
    resolve: (named: string) => byId.get(named) ?? byAddress.get(named) ?? null,
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
