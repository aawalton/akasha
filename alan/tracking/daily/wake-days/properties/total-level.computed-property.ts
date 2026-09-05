import type { ComputedProperty } from "@akasha/pages-system/computed-property"

export type TotalLevel = number

export const totalLevel = {
  id: "01a0721c-f58c-7290-8d4c-25779a5549a0",
  pageTypeSlug: "computed-property",
  slug: "total-level",
  propertySlug: "total-level",
  definition: "which of the four rungs the day's six values reached between them",
  holds: "number",
  code: "ts",
} as const satisfies ComputedProperty
