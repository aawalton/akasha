import { isFileBacked } from "akasha/page/access/modules/file-backed-roster/file-backed-roster.module.code.ts"
import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { resolveDescendantPageTypeIds } from "akasha/page/core/schema/modules/page-type-inheritance/page-type-inheritance.module.code.ts"
import {
  type PageTypeSlug,
  toPageTypeSlug,
} from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"

const PAGE_TYPE_SLUG = "page-type"

class PageTypesMissing extends Error {
  readonly slugs: readonly string[]
  constructor(slugs: readonly string[]) {
    super(`no page-type file for slug(s): ${slugs.join(", ")}`)
    this.name = "PageTypesMissing"
    this.slugs = slugs
  }
}

async function requirePageTypeOnFiles(): Promise<undefined> {
  if (await isFileBacked(PAGE_TYPE_SLUG)) return
  throw new PageTypesMissing([PAGE_TYPE_SLUG])
}

async function pageTypeFromFiles(where: string, key: string, value: string): Promise<Page | null> {
  await requirePageTypeOnFiles()
  const direct = await getPages({
    pageTypeSlug: PAGE_TYPE_SLUG,
    where: [{ key, eq: value }],
    limit: 2,
  })
  if (direct.rows.length > 1) {
    throw new Error(
      `${where}: ${key} '${value}' resolved to ${direct.rows.length} page-types; expected at most one`
    )
  }
  if (direct.rows.length === 1) return direct.rows[0] ?? null

  for (const slug of await getDescendantPageTypeSlugs(toPageTypeSlug(PAGE_TYPE_SLUG))) {
    if (slug === PAGE_TYPE_SLUG) continue
    if (!(await isFileBacked(slug))) continue
    const got = await getPages({
      pageTypeSlug: slug,
      where: [{ key, eq: value }],
      limit: 2,
    })
    if (got.rows.length > 1) {
      throw new Error(
        `${where}: ${key} '${value}' resolved to ${got.rows.length} page-types; expected at most one`
      )
    }
    if (got.rows.length === 1) return got.rows[0] ?? null
  }
  return null
}

export async function getPageTypeBySlug(slug: string): Promise<Page | null> {
  return pageTypeFromFiles("getPageTypeBySlug", "slug", slug)
}

export async function getDescendantPageTypeSlugs(
  parentSlug: PageTypeSlug
): Promise<PageTypeSlug[]> {
  const { rows } = await getPages({
    pageTypeSlug: "page-type",
    select: ["id", "slug", "extends"],
  })

  const pageTypes = rows.map((r) => ({
    _id: typeof r.id === "string" ? r.id : "",
    properties: { slug: r.slug, extends: r.extends },
  }))
  const parent = rows.find((r) => r.slug === parentSlug)
  if (parent === undefined || typeof parent.id !== "string") return []

  const descendantIds = resolveDescendantPageTypeIds(pageTypes, parent.id)
  const slugById = new Map<string, unknown>()
  for (const r of rows) {
    if (typeof r.id === "string") slugById.set(r.id, r.slug)
  }
  const slugs: PageTypeSlug[] = []
  for (const id of descendantIds) {
    const slug = slugById.get(id)
    if (typeof slug === "string" && slug.length > 0) slugs.push(toPageTypeSlug(slug))
  }
  return slugs
}
