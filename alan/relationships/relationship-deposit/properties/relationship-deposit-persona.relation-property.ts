import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const relationshipDepositPersona = {
  id: "01a0658d-16bc-701b-8663-4049c2963e1c",
  type: "page-type/relation-property",
  slug: "relationship-deposit-persona",
  propertySlug: "relationship-deposit-persona",
  definition: "the persona that counts a relationship deposit",
  targetPageType: "page-type/persona",
  types: "ts",
  createdAt: "2026-09-03T04:35:40.348Z",
  updatedAt: "2026-10-30T16:23:21.159Z",
} as const satisfies RelationProperty
