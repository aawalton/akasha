import type { ComputedProperty } from "@akasha/pages-system/computed-property"

export type LoveLevel = number

export const loveLevel = {
  id: "01a07211-0e16-70eb-8fe6-99a139aa72eb",
  pageTypeSlug: "computed-property",
  slug: "love-level",
  propertySlug: "love-level",
  definition: "which of the four rungs the day's love points reached",
  holds: "number",
  code: "ts",
} as const satisfies ComputedProperty
