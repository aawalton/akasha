import type { ComputedProperty } from "akasha/pages/computed-properties/computed-property.page-type.types.ts"

export type HealthStoplight = string

export const healthStoplight = {
  id: "01a0721c-6315-7fbb-9c8e-b512bd9aceb7",
  pageTypeSlug: "computed-property",
  type: "computed-property",
  slug: "health-stoplight",
  propertySlug: "health-stoplight",
  definition: "the rung the day's health reached, as one colored light",
  holds: "text",
  code: "ts",
} as const satisfies ComputedProperty
