import type { PageQuery } from "../page-query.page-type.ts"

export const appearanceExperimentsAll = {
  id: "01a063f9-2209-79f2-acb5-fc224eaf654d",
  pageTypeSlug: "page-query",
  slug: "appearance-experiments-all",
  asksOfSlug: "appearance-experiment",
  keys: ["persona-slug", "date", "verdict"],
} as const satisfies PageQuery
