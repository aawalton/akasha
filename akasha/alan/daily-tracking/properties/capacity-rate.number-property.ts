import type { NumberProperty } from "@akasha/pages-system/number-property"

export type CapacityRate = number

export const capacityRate = {
  id: "01a05fd8-c30f-7486-b22b-7e17134582db",
  pageTypeSlug: "number-property",
  slug: "capacity-rate",
  propertySlug: "capacity-rate",
  definition: "how much capacity for stress an hour of a stretch gave back or took",
  max: null,
} as const satisfies NumberProperty
