import type { Page } from "akasha/pages/core/page-types/page-types.module.code.ts"
import type { PageTypeSlug } from "akasha/pages/url/page-type-slug/page-type-slug.module.code.ts"

export const ID_SUFFIX_LENGTH = 8
const ID_SUFFIX_PATTERN = /^[0-9a-f]{8}$/
const FALLBACK_SLUG = "untitled"

export type PageHrefArgs = {
  pageTypeSlug: PageTypeSlug
  slug: string | null | undefined
  fallbackSlugSource: string | null | undefined
  id: string
}

export type ParsedPageHrefParam = {
  slug: string | null
  idSuffix: string
}

export type PageLink = {
  readonly href: string
  readonly title: string | null
}

export function slugStem(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function resolveSlug(
  slug: string | null | undefined,
  fallbackSlugSource: string | null | undefined
): string {
  if (typeof slug === "string" && slug.length > 0) return slug
  const source = typeof fallbackSlugSource === "string" ? fallbackSlugSource : ""
  const slugified = slugStem(source)
  return slugified !== "" ? slugified : FALLBACK_SLUG
}

export function buildPageHrefParam(args: PageHrefArgs): string {
  const slug = resolveSlug(args.slug, args.fallbackSlugSource)
  const idSuffix = args.id.slice(-ID_SUFFIX_LENGTH)
  return `${slug}-${idSuffix}`
}

export function buildPageHref(args: PageHrefArgs): string {
  return `/${args.pageTypeSlug}/${buildPageHrefParam(args)}`
}

export function pageLinkOf(page: Page | null, pageTypeSlug: PageTypeSlug): PageLink | null {
  if (page == null || typeof page.id !== "string") return null
  const title = typeof page.title === "string" ? page.title : null
  return {
    href: buildPageHref({
      pageTypeSlug,
      slug: typeof page.slug === "string" ? page.slug : null,
      fallbackSlugSource: title,
      id: page.id,
    }),
    title,
  }
}

export function parsePageHrefParam(encoded: string): ParsedPageHrefParam | null {
  if (encoded.length < ID_SUFFIX_LENGTH) return null
  const lastDash = encoded.lastIndexOf("-")
  const candidate = lastDash >= 0 ? encoded.slice(lastDash + 1) : encoded
  if (!ID_SUFFIX_PATTERN.test(candidate)) return null
  const slugPart = lastDash >= 0 ? encoded.slice(0, lastDash) : ""
  return { slug: slugPart === "" ? null : slugPart, idSuffix: candidate }
}
