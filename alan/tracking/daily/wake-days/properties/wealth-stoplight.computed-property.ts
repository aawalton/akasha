import type { ComputedProperty } from "@akasha/pages-system/computed-property"

export type WealthStoplight = string

export const wealthStoplight = {
  id: "01a0721c-cebf-70db-ae3f-c35938f2e542",
  pageTypeSlug: "computed-property",
  slug: "wealth-stoplight",
  propertySlug: "wealth-stoplight",
  definition: "the rung the day's wealth reached, as one colored light",
  holds: "text",
  code: "ts",
} as const satisfies ComputedProperty
