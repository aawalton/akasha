import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type RelationshipCommitment = number

export const relationshipCommitment = {
  id: "01a06594-c6e2-7c3b-92a3-41e1bfa6f191",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "relationship-commitment",
  propertySlug: "relationship-commitment",
  definition: "how much Alan means to keep investing in this person",
  max: null,
} as const satisfies NumberProperty
