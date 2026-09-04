import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type InitiativePersonaSlug = Slug

export const initiativePersonaSlug = {
  id: "01a06d59-446d-79b0-af7c-56fc8ec01122",
  pageTypeSlug: "relation-property",
  slug: "initiative-persona-slug",
  propertySlug: "persona-slug",
  definition: "the persona whose work an initiative is",
  targetPageTypeSlug: "page-type/persona",
} as const satisfies RelationProperty
