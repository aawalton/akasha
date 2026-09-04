import type { PageQuery } from "../page-query.page-type.ts"

export const foodEntryPlantsSinceWaking = {
  id: "01a063f9-220d-70b7-a692-7772b9b9a8c5",
  pageTypeSlug: "page-query",
  slug: "food-entry-plants-since-waking",
  asksOfSlug: "food-entry",
  narrows: [{ key: "happenedAt", comparison: "at-or-after", values: ["wake-day"] }],
  reduction: "sum",
  targetKey: "plantGrams",
} as const satisfies PageQuery
