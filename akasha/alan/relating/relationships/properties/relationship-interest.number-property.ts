import type { NumberProperty } from "@akasha/pages-system/number-property"

export type RelationshipInterest = number

export const relationshipInterest = {
  id: "01a0658a-f4df-7687-83fd-df69d15a8cf3",
  pageTypeSlug: "number-property",
  slug: "relationship-interest",
  propertySlug: "relationship-interest",
  definition: "how much Alan wants to spend time with this person",
  max: null,
} as const satisfies NumberProperty
