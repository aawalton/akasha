import { textIn as named } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { getPage, getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import {
  type PageTypeForInheritance,
  pageTypeChain,
} from "akasha/page/core/schema/modules/page-type-inheritance/page-type-inheritance.module.code.ts"

const PAGE_TYPE_SLUG = "page-type"

export function iconByDescent(
  own: unknown,
  pageTypes: ReadonlyArray<PageTypeForInheritance>,
  pageTypeSlug: string
): string | null {
  const stated = named(own)
  if (stated !== null) return stated
  const bySlug = new Map<string, PageTypeForInheritance>()
  for (const pt of pageTypes) {
    const slug = named(pt.properties?.slug)
    if (slug !== null) bySlug.set(slug, pt)
  }
  for (const slug of pageTypeChain(pageTypes, pageTypeSlug)) {
    const icon = named(bySlug.get(slug)?.properties?.icon)
    if (icon !== null) return icon
  }
  return null
}

export async function pageIcon(pageTypeSlug: string, id: string): Promise<string | null> {
  try {
    const [page, types] = await Promise.all([
      getPage({ pageTypeSlug, where: [{ key: "id", eq: id }], select: ["id", "icon"] }),
      getPages({ pageTypeSlug: PAGE_TYPE_SLUG, select: ["id", "slug", "icon", "extends"] }),
    ])
    const pageTypes = types.rows.map((row) => ({
      _id: typeof row.id === "string" ? row.id : "",
      properties: { slug: row.slug, icon: row.icon, extends: row.extends },
    }))
    return iconByDescent(page?.icon, pageTypes, pageTypeSlug)
  } catch (err) {
    console.error(
      `page-icon: the icon of ${pageTypeSlug}/${id} went unread, so its tab shows the site's icon`,
      err
    )
    return null
  }
}
