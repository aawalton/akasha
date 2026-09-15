import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const matches = {
  id: "01a0680c-3c00-7003-b571-6f4c9a2d3104",
  type: "page-type/record-property",
  slug: "matches",
  propertySlug: "matches",
  definition: "what a rule tests a transaction against, each with the key tested and how",
  properties: [
    { pageProperty: "select-property/match-key", required: true, many: false },
    { pageProperty: "select-property/match-comparison", required: true, many: false },
    { pageProperty: "text-property/match-values", required: true, many: true, maxCount: 20 },
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A transaction is caught where the transaction passes every clause.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule with no clause catches nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every rule tests a merchant.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule's remaining keys narrow from the merchant.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Two clauses on one key are two entries.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
