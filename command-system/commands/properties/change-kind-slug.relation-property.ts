import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type ChangeKindSlug = Slug

export const changeKindSlug = {
  id: "01a05f9a-8255-7000-b59d-5bee73097608",
  pageTypeSlug: "relation-property",
  slug: "change-kind-slug",
  propertySlug: "change-kind-slug",
  definition: "the sort of change an act makes",
  targetPageTypeSlug: "page-type/change-kind",
} as const satisfies RelationProperty
