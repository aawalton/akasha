import type { Slug } from "@akasha/pages/page/slug"
import type { List } from "@akasha/pages/page-property"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type TmpPartOfCollections = List<Slug>

export const tmpPartOfCollections = {
  id: "01a0879b-f8fe-7843-95c3-9ff8c8c0ddab",
  pageTypeSlug: "relation-property",
  slug: "tmp-part-of-collections",
  propertySlug: "part-of-collections",
  definition: "the collections one collection is part of",
  targetPageType: "page-type/collection",
} as const satisfies RelationProperty
