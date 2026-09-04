import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type ExperimentPersonaSlug = Slug

export const experimentPersonaSlug = {
  id: "01a06d59-446e-771a-b415-e770351c25c9",
  pageTypeSlug: "relation-property",
  slug: "experiment-persona-slug",
  propertySlug: "persona-slug",
  definition: "the persona who read an experiment",
  targetPageTypeSlug: "page-type/persona",
} as const satisfies RelationProperty
