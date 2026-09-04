import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type ModelFamilySlug = Slug

export const modelFamilySlug = {
  id: "01a053eb-6b27-7641-97ae-c865663ac0d5",
  pageTypeSlug: "relation-property",
  slug: "model-family-slug",
  propertySlug: "model-family-slug",
  definition: "a slug naming a model family",
  targetPageTypeSlug: "page-type/model-family",
} as const satisfies RelationProperty
