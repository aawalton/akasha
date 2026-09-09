import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type InitiativePersona = Slug

export const initiativePersona = {
  id: "01a06d59-446d-79b0-af7c-56fc8ec01122",
  pageTypeSlug: "relation-property",
  slug: "initiative-persona",
  propertySlug: "persona",
  definition: "the persona whose work an initiative is",
  targetPageType: "page-type/persona",
} as const satisfies RelationProperty
