import type { ComputedProperty } from "akasha/pages/computed-properties/computed-property.page-type.types.ts"

export type LoveStoplight = string

export const loveStoplight = {
  id: "01a0721c-6315-7eef-bca5-ab5e1c8de12e",
  pageTypeSlug: "computed-property",
  type: "computed-property",
  slug: "love-stoplight",
  propertySlug: "love-stoplight",
  definition: "the rung the day's love reached, as one colored light",
  holds: "text",
  code: "ts",
} as const satisfies ComputedProperty
