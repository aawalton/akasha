type PageListingHrefArgs = {
  slug: string
  query?: URLSearchParams | string
}

export function buildPageListingHref(args: PageListingHrefArgs): string {
  const query = typeof args.query === "string" ? args.query : (args.query?.toString() ?? "")
  return query.length > 0 ? `/${args.slug}/?${query}` : `/${args.slug}/`
}
