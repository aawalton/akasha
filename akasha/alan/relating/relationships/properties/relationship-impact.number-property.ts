import type { NumberProperty } from "@akasha/pages-system/number-property"

export type RelationshipImpact = number

export const relationshipImpact = {
  id: "01a0658a-f4df-7e9d-9e64-d50baba542cc",
  pageTypeSlug: "number-property",
  slug: "relationship-impact",
  propertySlug: "relationship-impact",
  definition: "how much this person changes how Alan's life goes",
  max: null,
} as const satisfies NumberProperty
