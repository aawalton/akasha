import type { Page } from "@akasha/pages-core/page-types"
import { resolveDescendantPageTypeIds } from "@akasha/pages-core/schema/page-type-inheritance"
import { type PageTypeSlug, toPageTypeSlug } from "@akasha/pages-url/page-type-slug"
import { validateTemperTitlePrefix } from "../domain-title-prefix/domain-title-prefix.module.code.ts"
import { isFileBacked } from "../file-read/file-read.module.code.ts"
import {
  createFilePage,
  patchFilePages,
  refuseJsonPatch,
} from "../file-write/file-write.module.code.ts"
import { getPages } from "../get/get.module.code.ts"
import { validateSlugReserved } from "../reserved-slugs/reserved-slugs.module.code.ts"
import type { JsonPatch, PageSelect } from "../types/types.module.code.ts"

const PAGE_TYPE_SLUG = "page-type"

export class PageTypesMissing extends Error {
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

export type CreatePageTypeArgs = {
  properties: Partial<Page>
  select?: PageSelect
}

export async function createPageType(args: CreatePageTypeArgs): Promise<Page> {
  validateSlugReserved(args.properties.slug, "slug")
  validateSlugReserved(args.properties.pluralSlug, "pluralSlug")
  validateTemperTitlePrefix(args.properties.slug, args.properties.title)
  await requirePageTypeOnFiles()
  return createFilePage(
    { pageTypeSlug: PAGE_TYPE_SLUG, properties: args.properties, select: args.select },
    "createPageType"
  )
}

export type PatchPageTypeByIdArgs = {
  id: string
  set: Partial<Page>
  patch?: JsonPatch
  select?: PageSelect
}

export async function patchPageTypeById(args: PatchPageTypeByIdArgs): Promise<Page | null> {
  validateSlugReserved(args.set.slug, "slug")
  validateSlugReserved(args.set.pluralSlug, "pluralSlug")
  await requirePageTypeOnFiles()
  refuseJsonPatch("patchPageTypeById", PAGE_TYPE_SLUG, args.patch)
  const patched = await patchFilePages(
    {
      pageTypeSlug: PAGE_TYPE_SLUG,
      where: [{ key: "id", eq: args.id }],
      set: args.set,
      select: args.select,
    },
    "patchPageTypeById"
  )
  return patched[0] ?? null
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

export async function getPageTypeByPluralSlug(pluralSlug: string): Promise<Page | null> {
  const onFile = await pageTypeFromFiles("getPageTypeByPluralSlug", "pluralSlug", pluralSlug)
  if (onFile !== null) return onFile
  const bySlug = await getPageTypeBySlug(pluralSlug)
  if (bySlug === null) return null
  const stated = bySlug.pluralSlug
  return stated == null || stated === "" ? bySlug : null
}

export async function getPageTypeBySlug(slug: string): Promise<Page | null> {
  return pageTypeFromFiles("getPageTypeBySlug", "slug", slug)
}

export async function getDescendantPageTypeSlugs(
  parentSlug: PageTypeSlug
): Promise<PageTypeSlug[]> {
  const { rows } = await getPages({
    pageTypeSlug: "page-type",
    select: ["id", "slug", "extendsSlug"],
  })

  const pageTypes = rows.map((r) => ({
    _id: typeof r.id === "string" ? r.id : "",
    properties: { slug: r.slug, extendsSlug: r.extendsSlug },
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
