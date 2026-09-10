import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const matchComparison = {
  id: "01a0680c-3c00-7001-a763-8d2f5b9e3102",
  pageTypeSlug: "select-property",
  type: "select-property",
  slug: "match-comparison",
  propertySlug: "comparison",
  definition: "how a clause weighs what it tests against what it holds",
  values: ["is", "is-not", "on-or-after", "is-before"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A clause with several values passes where a single value matches.",
    },
    {
      invariantKind: "departure",
      statement: "Only a clause testing a date compares by `on-or-after` or `is-before`.",
    },
  ],
} as const satisfies SelectProperty

export type MatchComparison = (typeof matchComparison.values)[number]
