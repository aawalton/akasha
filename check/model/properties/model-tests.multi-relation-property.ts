import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const modelTests = {
  id: "01a05911-aa17-7af6-9941-6715a1205f25",
  type: "page-type/multi-relation-property",
  slug: "model-tests",
  propertySlug: "model-tests",
  definition: "the tests a check puts to a model, in the order they are run",
  targetPageType: "page-type/model-test",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One check has the tests that judge one thing from different sides.",
    },
  ],
  types: "ts",
  createdAt: "2026-08-31T18:25:25.015Z",
  updatedAt: "2026-09-22T13:56:02.000Z",
} as const satisfies MultiRelationProperty
