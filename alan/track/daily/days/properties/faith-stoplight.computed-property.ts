import type { ComputedProperty } from "akasha/pages/computed-properties/computed-property.page-type.types.ts"

export type FaithStoplight = string

export const faithStoplight = {
  id: "01a0721c-6314-7ada-aa29-58838a715a52",
  pageTypeSlug: "computed-property",
  type: "computed-property",
  slug: "faith-stoplight",
  propertySlug: "faith-stoplight",
  definition: "the rung the day's faith reached, as one colored light",
  holds: "text",
  code: "ts",
} as const satisfies ComputedProperty
