import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type MessagedPersona = Slug

export const messagedPersona = {
  id: "01a082db-817c-7626-b074-d75a367de571",
  pageTypeSlug: "relation-property",
  slug: "messaged-persona",
  propertySlug: "persona-slug",
  definition: "the persona Alan wrote to",
  targetPageType: "page-type/persona",
} as const satisfies RelationProperty
