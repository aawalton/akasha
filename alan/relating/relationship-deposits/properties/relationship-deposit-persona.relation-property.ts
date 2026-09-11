import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const relationshipDepositPersona = {
  id: "01a0658d-16bc-701b-8663-4049c2963e1c",
  type: "relation-property",
  slug: "relationship-deposit-persona",
  propertySlug: "relationship-deposit-persona",
  definition: "the persona who counts it",
  targetPageType: "page-type/persona",
  types: "ts",
} as const satisfies RelationProperty
