import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type RelationshipDepositPersona = Slug

export const relationshipDepositPersona = {
  id: "01a0658d-16bc-701b-8663-4049c2963e1c",
  pageTypeSlug: "relation-property",
  slug: "relationship-deposit-persona",
  propertySlug: "relationship-deposit-persona",
  definition: "the persona who counts it",
  targetPageType: "page-type/persona",
} as const satisfies RelationProperty
