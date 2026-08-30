import type { Slug } from "../../../../pages-system/page/properties/slug.text-property.ts"
import type { RelationProperty } from "../../../../pages-system/relation-property/relation-property.page-type.ts"

export type ModelFamilySlug = Slug

export const modelFamilySlug = {
  id: "01a053eb-6b27-7641-97ae-c865663ac0d5",
  pageTypeSlug: "relation-property",
  slug: "model-family-slug",
  propertySlug: "model-family-slug",
  definition: "a slug naming a model family",
  targetPageTypeSlug: "page-type/model-family",
} as const satisfies RelationProperty
