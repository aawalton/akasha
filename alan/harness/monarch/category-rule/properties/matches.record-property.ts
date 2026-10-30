import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const matches = {
  id: "01a0680c-3c00-7003-b571-6f4c9a2d3104",
  type: "page-type/record-property",
  slug: "matches",
  propertySlug: "matches",
  definition:
    "the parts of a transaction a category rule looks at and the values the rule looks for",
  properties: [
    { pageProperty: "select-property/match-key", required: true, many: false },
    { pageProperty: "select-property/match-comparison", required: true, many: false },
    { pageProperty: "text-property/match-values", required: true, many: true, maxCount: 20 },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A transaction is caught where the transaction passes every clause.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule with no clause catches nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every rule tests a merchant.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule's remaining keys narrow from the merchant.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two clauses on one key are two entries.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T16:13:47.392Z",
  updatedAt: "2026-10-30T15:45:46.911Z",
} as const satisfies RecordProperty
