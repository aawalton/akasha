import type { NumberProperty } from "@akasha/pages-system/number-property"

export type RelationshipConnection = number

export const relationshipConnection = {
  id: "01a0658a-f4df-763e-a0bc-2eb7a99f005d",
  pageTypeSlug: "number-property",
  slug: "relationship-connection",
  propertySlug: "relationship-connection",
  definition: "how strongly Alan and this person are connected today",
  max: null,
} as const satisfies NumberProperty
