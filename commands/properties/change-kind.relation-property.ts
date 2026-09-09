import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type ChangeKind = Slug

export const changeKind = {
  id: "01a05f9a-8255-7000-b59d-5bee73097608",
  pageTypeSlug: "relation-property",
  slug: "change-kind",
  propertySlug: "change-kind",
  definition: "the sort of change an act makes",
  targetPageType: "page-type/change-kind",
} as const satisfies RelationProperty
