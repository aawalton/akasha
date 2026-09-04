import type { NumberProperty } from "@akasha/pages-system/number-property"

export type RelationshipConnection = number

export const relationshipConnection = {
  id: "01a06594-c6e2-7c23-93c9-d8edf6553553",
  pageTypeSlug: "number-property",
  slug: "relationship-connection",
  propertySlug: "relationship-connection",
  definition: "how strongly Alan and this person are connected today",
  max: null,
} as const satisfies NumberProperty
