import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export type ExperimentPersona = Slug

export const experimentPersona = {
  id: "01a06d59-446e-771a-b415-e770351c25c9",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "experiment-persona",
  propertySlug: "persona",
  definition: "the persona who read an experiment",
  targetPageType: "page-type/persona",
} as const satisfies RelationProperty
