import type { PageQuery } from "../page-query.page-type.ts"

export const artistsAll = {
  id: "01a063f9-2209-79bc-807f-8345c32975a2",
  pageTypeSlug: "page-query",
  slug: "artists-all",
  asksOfSlug: "artist",
  keys: ["id", "slug", "title", "genre", "rating", "external-id"],
} as const satisfies PageQuery
