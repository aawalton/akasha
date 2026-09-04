import type { NumberProperty } from "@akasha/pages-system/number-property"

export type RelationshipInterest = number

export const relationshipInterest = {
  id: "01a06594-c6e2-76db-8ed3-5fc3e504f492",
  pageTypeSlug: "number-property",
  slug: "relationship-interest",
  propertySlug: "relationship-interest",
  definition: "how much Alan wants to spend time with this person",
  max: null,
} as const satisfies NumberProperty
