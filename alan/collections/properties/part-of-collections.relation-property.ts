import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const partOfCollections = {
  id: "01a063de-2c60-700b-8db4-bed38f86b940",
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
  types: "ts",
} as const satisfies RelationProperty
