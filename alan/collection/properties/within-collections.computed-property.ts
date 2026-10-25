import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const withinCollections = {
  id: "01a174a8-86b5-7bf4-bfec-4668011d9064",
  type: "page-type/computed-property",
  slug: "within-collections",
  propertySlug: "within-collections",
  definition: "every collection a collection sits inside, however far up",
  holds: "records",
  properties: [
    { pageProperty: "relation-property/within-collection", required: true, many: false },
  ],
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A collection sits inside each collection it is part of and everything those sit inside.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each collection is named once, however many ways it is reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection part of nothing sits inside nothing.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-25T20:02:44.020Z",
  updatedAt: "2026-10-25T20:02:44.020Z",
} as const satisfies ComputedProperty
