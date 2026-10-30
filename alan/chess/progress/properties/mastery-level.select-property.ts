import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const masteryLevel = {
  id: "01a06582-bd62-7187-be50-aa4e75fcf746",
  type: "page-type/select-property",
  slug: "mastery-level",
  propertySlug: "mastery-level",
  definition: "the strength Alan has in a part of chess",
  values: ["novice", "developing", "strong", "expert"],
  types: "ts",
  createdAt: "2026-09-03T04:24:22.114Z",
  updatedAt: "2026-10-30T15:09:41.737Z",
} as const satisfies SelectProperty
