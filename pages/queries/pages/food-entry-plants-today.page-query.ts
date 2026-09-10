import type { PageQuery } from "../page-query.page-type.types.ts"

export const foodEntryPlantsToday = {
  id: "01a063f9-220d-70b7-a692-7772b9b9a8c5",
  pageTypeSlug: "page-query",
  type: "page-query",
  slug: "food-entry-plants-today",
  asksOfSlug: "food-entry",
  narrows: [{ key: "happenedAt", comparison: "at-or-after", values: ["day"] }],
  reduction: "sum",
  targetKey: "plantGrams",
} as const satisfies PageQuery
