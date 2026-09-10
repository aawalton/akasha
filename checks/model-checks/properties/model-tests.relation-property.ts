import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const modelTests = {
  id: "01a05911-aa17-7af6-9941-6715a1205f25",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "model-tests",
  propertySlug: "model-tests",
  definition: "the tests a check puts to a model, in the order they are run",
  targetPageType: "page-type/model-test",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One check has the tests that judge one thing from different sides.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
