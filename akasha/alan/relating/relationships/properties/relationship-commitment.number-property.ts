import type { NumberProperty } from "@akasha/pages-system/number-property"

export type RelationshipCommitment = number

export const relationshipCommitment = {
  id: "01a0658a-f4df-7cbf-9fae-fd9845a35eee",
  pageTypeSlug: "number-property",
  slug: "relationship-commitment",
  propertySlug: "relationship-commitment",
  definition: "how much Alan means to keep investing in this person",
  max: null,
} as const satisfies NumberProperty
