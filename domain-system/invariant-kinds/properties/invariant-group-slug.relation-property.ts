import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type InvariantGroupSlug = Slug

export const invariantGroupSlug = {
  id: "01a04e11-9f98-7cf1-ac25-c66b4eea07c5",
  pageTypeSlug: "relation-property",
  slug: "invariant-group-slug",
  propertySlug: "invariant-group-slug",
  definition: "a slug naming an invariant group",
  targetPageTypeSlug: "page-type/invariant-group",
} as const satisfies RelationProperty
