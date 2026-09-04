import type { List } from "@akasha/pages-system/page-property"
import type { RecordProperty } from "@akasha/pages-system/record-property"
import type { MatchComparison } from "./match-comparison.select-property.ts"
import type { MatchKey } from "./match-key.select-property.ts"
import type { MatchValues } from "./match-values.text-property.ts"

export type Match = {
  key: MatchKey
  comparison: MatchComparison
  values: readonly MatchValues[]
}

export type Matches = List<Match>

export const matches = {
  id: "01a0680c-3c00-7003-b571-6f4c9a2d3104",
  pageTypeSlug: "record-property",
  slug: "matches",
  propertySlug: "matches",
  definition: "what a rule tests a transaction against, each with the key tested and how",
  properties: [
    { pagePropertySlug: "match-key", required: true, many: false },
    { pagePropertySlug: "match-comparison", required: true, many: false },
    { pagePropertySlug: "match-values", required: true, many: true, max: 20 },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A transaction is caught where the transaction passes every clause.",
    },
    {
      invariantKind: "departure",
      statement: "A rule holding no clause catches nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Every rule tests a merchant, and the rest of the keys narrow from there.",
    },
    {
      invariantKind: "departure",
      statement: "Two clauses on one key are two entries.",
    },
  ],
} as const satisfies RecordProperty
