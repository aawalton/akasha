import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type AlertPersona = Slug

export const alertPersona = {
  id: "01a06935-9779-7dc1-8aa1-cd00a3576c4b",
  pageTypeSlug: "relation-property",
  slug: "alert-persona",
  propertySlug: "persona",
  definition: "the persona an alert is for",
  targetPageType: "page-type/persona",
} as const satisfies RelationProperty
