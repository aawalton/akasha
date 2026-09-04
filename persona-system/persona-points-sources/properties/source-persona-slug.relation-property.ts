import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type SourcePersonaSlug = Slug

export const sourcePersonaSlug = {
  id: "01a06d68-851d-7f22-97a3-73cc26de43fd",
  pageTypeSlug: "relation-property",
  slug: "source-persona-slug",
  propertySlug: "persona-slug",
  definition: "the persona whose points a source is counted into",
  targetPageTypeSlug: "page-type/persona",
} as const satisfies RelationProperty
