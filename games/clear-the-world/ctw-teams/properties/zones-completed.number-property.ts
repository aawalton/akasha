import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ZonesCompleted = number

export const zonesCompleted = {
  id: "01a06579-e4f7-7f85-ac4a-1085dfcce10d",
  pageTypeSlug: "number-property",
  slug: "zones-completed",
  propertySlug: "zones-completed",
  definition: "how many zones the team has completed",
  max: null,
} as const satisfies NumberProperty
