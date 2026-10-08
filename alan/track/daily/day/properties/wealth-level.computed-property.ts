import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const wealthLevel = {
  id: "01a0720f-c6fc-740c-a8ac-1c3dbfad2809",
  type: "page-type/computed-property",
  slug: "wealth-level",
  propertySlug: "wealth-level",
  definition: "which of the four rungs the day's wealth points reached",
  holds: "number",
  code: "ts",
  types: "ts",
  createdAt: "2026-09-05T14:53:51.740Z",
  updatedAt: "2026-09-15T16:29:06.000Z",
} as const satisfies ComputedProperty
