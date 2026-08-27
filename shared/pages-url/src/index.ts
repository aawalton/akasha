
export type PageTypeSlug = string & { readonly __brand: "PageTypeSlug" }
export function PageTypeSlug(value: string): PageTypeSlug {
  return value as PageTypeSlug
}

export const ID_SUFFIX_LENGTH = 8
export const ID_SUFFIX_PATTERN = /^[0-9a-f]{8}$/
export const FALLBACK_SLUG = "untitled"

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

export function safeInternalPath(path: string): string | null {
  if (!path.startsWith("/") || path.startsWith("//")) return null
  if (path.includes("\\") || path.includes("://")) return null
  if (URL_STRIPPED_CHARS.test(path)) return null
  if (resolvedOrigin(path) !== PROBE_ORIGIN) return null
  return path
}

const URL_STRIPPED_CHARS = /[\t\n\r]/

const PROBE_ORIGIN = "https://probe.invalid"

function resolvedOrigin(path: string): string | null {
  try {
    return new URL(path, PROBE_ORIGIN).origin
  } catch {
    return null
  }
}

export type SafeRedirectTargetArgs = {
  next: string | null
  allowedHosts: readonly string[]
}

export function safeRedirectTarget(args: SafeRedirectTargetArgs): string | null {
  if (args.next == null || args.next === "") return null
  const internal = safeInternalPath(args.next)
  if (internal !== null) return internal
  let parsed: URL
  try {
    parsed = new URL(args.next)
  } catch {
    return null
  }
  if (parsed.protocol !== "https:") return null
  const host = parsed.hostname.toLowerCase()
  for (const allowed of args.allowedHosts) {
    const allowedHost = allowed.toLowerCase()
    if (host === allowedHost || host.endsWith(`.${allowedHost}`)) return args.next
  }
  return null
}

export type PageListingHrefArgs = {
  pluralSlug: string
  query?: URLSearchParams | string
}

export function buildPageListingHref(args: PageListingHrefArgs): string {
  const query = typeof args.query === "string" ? args.query : (args.query?.toString() ?? "")
  return query.length > 0 ? `/${args.pluralSlug}/?${query}` : `/${args.pluralSlug}/`
}

export const DISPLAY_PARAM = "display"
export const DISPLAY_PROPERTIES = "properties"
export type PageDisplayMode = "page" | "properties"

export function parseDisplayMode(value: string | null | undefined): PageDisplayMode {
  return value === DISPLAY_PROPERTIES ? "properties" : "page"
}

export function buildViewPropertiesHref(pathname: string): string {
  return `${pathname}?${DISPLAY_PARAM}=${DISPLAY_PROPERTIES}`
}

export function parsePageHrefParam(encoded: string): ParsedPageHrefParam | null {
  if (encoded.length < ID_SUFFIX_LENGTH) return null
  const lastDash = encoded.lastIndexOf("-")
  const candidate = lastDash >= 0 ? encoded.slice(lastDash + 1) : encoded
  if (!ID_SUFFIX_PATTERN.test(candidate)) return null
  const slugPart = lastDash >= 0 ? encoded.slice(0, lastDash) : ""
  return { slug: slugPart === "" ? null : slugPart, idSuffix: candidate }
}
