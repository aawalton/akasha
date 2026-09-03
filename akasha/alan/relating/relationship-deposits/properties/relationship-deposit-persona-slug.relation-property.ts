import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type RelationshipDepositPersonaSlug = Slug

export const relationshipDepositPersonaSlug = {
  id: "01a0658d-16bc-701b-8663-4049c2963e1c",
  pageTypeSlug: "relation-property",
  slug: "relationship-deposit-persona-slug",
  propertySlug: "relationship-deposit-persona-slug",
  definition: "the persona who counts it",
  targetPageTypeSlug: "page-type/persona",
} as const satisfies RelationProperty
