import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const wealthStoplight = {
  id: "01a0721c-cebf-70db-ae3f-c35938f2e542",
  type: "page-type/computed-property",
  slug: "wealth-stoplight",
  propertySlug: "wealth-stoplight",
  definition: "the rung the day's wealth reached, as a colored light",
  holds: "text",
  code: "ts",
  types: "ts",
} as const satisfies ComputedProperty
