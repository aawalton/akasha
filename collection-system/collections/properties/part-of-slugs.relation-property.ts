import type { Slug } from "@akasha/pages-system/page/slug"
import type { List } from "@akasha/pages-system/page-property"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type PartOfSlugs = List<Slug>

export const partOfSlugs = {
  id: "01a063de-2c60-700b-8db4-bed38f86b940",
  pageTypeSlug: "relation-property",
  slug: "part-of-slugs",
  propertySlug: "part-of-slugs",
  definition: "the collections a collection is part of",
  targetPageTypeSlug: "page-type/collection",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The parts of a collection are the collections naming that collection here.",
    },
  ],
} as const satisfies RelationProperty
