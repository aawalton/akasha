import type { Slug } from "akasha/pages/properties/slug.text-property.ts"
import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export type Exercise = Slug

export const exercise = {
  id: "01a06580-66fd-7e47-b51f-4d1b33a2ba66",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "exercise",
  propertySlug: "exercise",
  definition: "the movement the set was of",
  targetPageType: "page-type/exercise",
} as const satisfies RelationProperty
