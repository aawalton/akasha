import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type SessionPersona = Slug

export const sessionPersona = {
  id: "01a06d67-5303-706a-b90c-da8a8764a769",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "session-persona",
  propertySlug: "persona",
  definition: "the persona who made a review pass",
  targetPageType: "page-type/persona",
} as const satisfies RelationProperty
