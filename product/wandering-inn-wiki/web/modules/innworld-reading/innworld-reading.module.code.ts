import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { getPageByIdSuffix, getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { getPageTypeBySlug } from "akasha/page/access/modules/page-type/page-type.module.code.ts"
import {
  buildPageHrefParam,
  parsePageHrefParam,
} from "akasha/page/url/modules/page-href/page-href.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"

const PAGE_TYPE = "page-type"

const AT_ONCE = 200

const TYPES_AT_ONCE = 500

const UNSHOWN: readonly string[] = ["id", "slug", "type", "title"]

export type Named = { readonly slug: string; readonly definition: string | null }

export type Listed = { readonly href: string; readonly title: string }

export type Listing = {
  readonly pageTypeSlug: string
  readonly rows: readonly Listed[]
  readonly from: number
  readonly atOnce: number
  readonly more: boolean
}

export type Shown = {
  readonly pageTypeSlug: string
  readonly title: string
  readonly fields: readonly (readonly [string, string])[]
}

export function saidAs(value: unknown): string | null {
  if (typeof value === "string") return value === "" ? null : value
  if (typeof value === "number" || typeof value === "boolean") return String(value)
  if (Array.isArray(value)) {
    const said = value.map(saidAs).filter((one) => one !== null)
    return said.length === 0 ? null : said.join(", ")
  }
  return null
}

export function fieldsOf(
  page: Readonly<Record<string, unknown>>
): readonly (readonly [string, string])[] {
  const held: (readonly [string, string])[] = []
  for (const key of Object.keys(page).sort()) {
    if (UNSHOWN.includes(key)) continue
    const said = saidAs(page[key])
    if (said !== null) held.push([key, said])
  }
  return held
}

export async function typesRead(): Promise<readonly Named[]> {
  const { rows } = await getPages({
    pageTypeSlug: PAGE_TYPE,
    select: ["id", "slug", "definition"],
    limit: TYPES_AT_ONCE,
  })
  const held: Named[] = []
  for (const one of rows) {
    const slug = textIn(one["slug"])
    if (slug === null) continue
    held.push({ slug, definition: textIn(one["definition"]) })
  }
  return held.sort((one, two) => (one.slug < two.slug ? -1 : 1))
}

async function slugHeld(pageTypeSlug: string): Promise<string | null> {
  const pageType = await getPageTypeBySlug(pageTypeSlug)
  return pageType === null ? null : textIn(pageType["slug"])
}

export async function listingRead(pageTypeSlug: string, from: number): Promise<Listing | null> {
  const slug = await slugHeld(pageTypeSlug)
  if (slug === null) return null
  const { rows } = await getPages({
    pageTypeSlug: slug,
    select: ["id", "slug", "title"],
    order: [{ by: "slug", dir: "asc" }],
    limit: AT_ONCE + 1,
    offset: from,
  })
  const held: Listed[] = []
  for (const one of rows.slice(0, AT_ONCE)) {
    const id = textIn(one["id"])
    if (id === null) continue
    const title = textIn(one["title"])
    const named = textIn(one["slug"])
    held.push({
      href: `/${slug}/${buildPageHrefParam({ pageTypeSlug: toPageTypeSlug(slug), slug: named, fallbackSlugSource: title, id })}`,
      title: title ?? named ?? id,
    })
  }
  return { pageTypeSlug: slug, rows: held, from, atOnce: AT_ONCE, more: rows.length > AT_ONCE }
}

export async function pageRead(pageTypeSlug: string, param: string): Promise<Shown | null> {
  const parsed = parsePageHrefParam(param)
  if (parsed === null) return null
  const slug = await slugHeld(pageTypeSlug)
  if (slug === null) return null
  const page = await getPageByIdSuffix({
    pageTypeSlug: toPageTypeSlug(slug),
    idSuffix: parsed.idSuffix,
    ...(parsed.slug === null ? {} : { slug: parsed.slug }),
  })
  if (page === null) return null
  const title = textIn(page["title"]) ?? textIn(page["slug"]) ?? parsed.idSuffix
  return { pageTypeSlug: slug, title, fields: fieldsOf(page) }
}
