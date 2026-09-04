import type { PageQuery } from "../page-query.page-type.ts"

export const episodesWatched = {
  id: "01a063f9-220a-7453-9116-d1871fe1a97f",
  pageTypeSlug: "page-query",
  slug: "episodes-watched",
  asksOfSlug: "episode",
  narrows: [{ key: "completedAt", comparison: "empty", values: ["false"] }],
  reduction: "sum",
  targetKey: "length",
} as const satisfies PageQuery
