import type { ComputedProperty } from "@akasha/pages-system/computed-property"

export type WealthLevel = number

export const wealthLevel = {
  id: "01a0720f-c6fc-740c-a8ac-1c3dbfad2809",
  pageTypeSlug: "computed-property",
  slug: "wealth-level",
  propertySlug: "wealth-level",
  definition: "which of the four rungs the day's wealth points reached",
  holds: "number",
  code: "ts",
} as const satisfies ComputedProperty
