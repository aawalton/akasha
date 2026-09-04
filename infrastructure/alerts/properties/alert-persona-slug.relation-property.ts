import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type AlertPersonaSlug = Slug

export const alertPersonaSlug = {
  id: "01a06935-9779-7dc1-8aa1-cd00a3576c4b",
  pageTypeSlug: "relation-property",
  slug: "alert-persona-slug",
  propertySlug: "persona-slug",
  definition: "the persona an alert is for",
  targetPageTypeSlug: "page-type/persona",
} as const satisfies RelationProperty
