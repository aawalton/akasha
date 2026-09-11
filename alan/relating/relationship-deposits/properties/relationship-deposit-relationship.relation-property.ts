import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const relationshipDepositRelationship = {
  id: "01a0658d-16bc-7f4b-9f6a-084d08b2ce0b",
  type: "relation-property",
  slug: "relationship-deposit-relationship",
  propertySlug: "relationship-deposit-relationship",
  definition: "the person it was put into",
  targetPageType: "page-type/relationship",
  types: "ts",
} as const satisfies RelationProperty
