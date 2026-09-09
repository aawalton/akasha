import type { Slug } from "@akasha/pages/page/slug"
import type { List } from "@akasha/pages/page-property"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type PartOfCollectionSlugs = List<Slug>

export const partOfCollectionSlugs = {
  id: "01a063de-2c60-700b-8db4-bed38f86b940",
  pageTypeSlug: "relation-property",
  slug: "part-of-collection-slugs",
  propertySlug: "part-of-collection-slugs",
  definition: "the collections a collection is part of",
  targetPageType: "page-type/collection",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The parts of a collection are the collections naming that collection here.",
    },
  ],
} as const satisfies RelationProperty
