import type { Slug } from "../../../pages-system/page/properties/slug.text-property.ts"
import type { RelationProperty } from "../../../pages-system/page-property/relation-property.page-type.ts"

export type InvariantGroupSlug = Slug

export const invariantGroupSlug = {
  id: "01a04e11-9f98-7cf1-ac25-c66b4eea07c5",
  pageTypeSlug: "relation-property",
  slug: "invariant-group-slug",
  definition: "a slug naming an invariant group",
  targetPageTypeSlug: "page-type/invariant-group",
} as const satisfies RelationProperty
