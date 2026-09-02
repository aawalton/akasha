import type { PageQuery } from "../page-query.page-type.ts"

export const readoutsAll = {
  id: "01a063f9-220d-7598-8371-953813136f0c",
  pageTypeSlug: "page-query",
  slug: "readouts-all",
  asksOfSlug: "readout",
  keys: ["slug", "none-left-words", "none-left-emoji"],
} as const satisfies PageQuery
