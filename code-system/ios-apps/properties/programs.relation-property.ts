import type { Slug } from "@akasha/pages/page/slug"
import type { List } from "@akasha/pages/page-property"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type Programs = List<Slug>

export const programs = {
  id: "01a0775f-5cca-7000-ad4b-c0a1dcdf54c6",
  pageTypeSlug: "relation-property",
  slug: "programs",
  propertySlug: "programs",
  definition: "the programs an app builds",
  targetPageType: "page-type/ios-program",
} as const satisfies RelationProperty
