import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type ExerciseSlug = Slug

export const exerciseSlug = {
  id: "01a06580-66fd-7e47-b51f-4d1b33a2ba66",
  pageTypeSlug: "relation-property",
  slug: "exercise-slug",
  propertySlug: "exercise-slug",
  definition: "the movement the set was of",
  targetPageTypeSlug: "page-type/exercise",
} as const satisfies RelationProperty
