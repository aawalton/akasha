import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ConnectionActivityEnergy = number

export const connectionActivityEnergy = {
  id: "01a0658e-c30d-71d2-af0a-c5f394d8ae98",
  pageTypeSlug: "number-property",
  slug: "connection-activity-energy",
  propertySlug: "connection-activity-energy",
  definition: "how much life they bring to it",
  max: null,
} as const satisfies NumberProperty
