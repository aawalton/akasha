import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const partOfCollections = {
  id: "01a063de-2c60-700b-8db4-bed38f86b940",
  type: "page-type/multi-relation-property",
  slug: "part-of-collections",
  propertySlug: "part-of-collections",
  definition: "a collection's parent collections",
  targetPageType: "page-type/collection",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The parts of a collection are the collections naming that collection here.",
    },
  ],
  types: "ts",
} as const satisfies MultiRelationProperty
