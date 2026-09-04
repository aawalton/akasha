import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type SessionPersonaSlug = Slug

export const sessionPersonaSlug = {
  id: "01a06d67-5303-706a-b90c-da8a8764a769",
  pageTypeSlug: "relation-property",
  slug: "session-persona-slug",
  propertySlug: "persona-slug",
  definition: "the persona who made a review pass",
  targetPageTypeSlug: "page-type/persona",
} as const satisfies RelationProperty
