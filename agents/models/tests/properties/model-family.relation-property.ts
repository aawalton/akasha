import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type ModelFamily = Slug

export const modelFamily = {
  id: "01a053eb-6b27-7641-97ae-c865663ac0d5",
  pageTypeSlug: "relation-property",
  slug: "model-family",
  propertySlug: "model-family",
  definition: "a slug naming a model family",
  targetPageType: "page-type/model-family",
} as const satisfies RelationProperty
