import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"
import type { MatchComparison } from "./match-comparison.select-property.types.ts"
import type { MatchKey } from "./match-key.select-property.types.ts"
import type { MatchValues } from "./match-values.text-property.types.ts"

export type Match = {
  key: MatchKey
  comparison: MatchComparison
  values: MatchValues
}

export type Matches = List<Match>

export const matches = {
  id: "01a0680c-3c00-7003-b571-6f4c9a2d3104",
  pageTypeSlug: "record-property",
  type: "record-property",
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
      invariantKind: "departure",
      statement: "A transaction is caught where the transaction passes every clause.",
    },
    {
      invariantKind: "departure",
      statement: "A rule with no clause catches nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Every rule tests a merchant.",
    },
    {
      invariantKind: "departure",
      statement: "A rule's remaining keys narrow from the merchant.",
    },
    {
      invariantKind: "departure",
      statement: "Two clauses on one key are two entries.",
    },
  ],
} as const satisfies RecordProperty
