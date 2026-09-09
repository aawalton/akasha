import type { Slug } from "@akasha/pages/page/slug"
import type { List } from "@akasha/pages/page-property"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type PartOfCollections = List<Slug>

export const partOfCollections = {
  id: "01a063de-2c60-700b-8db4-bed38f86b940",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "part-of-collections",
  propertySlug: "part-of-collections",
  definition: "the collections a collection is part of",
  targetPageType: "page-type/collection",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The parts of a collection are the collections naming that collection here.",
    },
  ],
} as const satisfies RelationProperty
