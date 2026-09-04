export type PageListingHrefArgs = {
  pluralSlug: string
  query?: URLSearchParams | string
}

export function buildPageListingHref(args: PageListingHrefArgs): string {
  const query = typeof args.query === "string" ? args.query : (args.query?.toString() ?? "")
  return query.length > 0 ? `/${args.pluralSlug}/?${query}` : `/${args.pluralSlug}/`
}
