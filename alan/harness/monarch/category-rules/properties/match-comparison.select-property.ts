import type { SelectProperty } from "@akasha/pages-system/select-property"

export const matchComparison = {
  id: "01a0680c-3c00-7001-a763-8d2f5b9e3102",
  pageTypeSlug: "select-property",
  slug: "match-comparison",
  propertySlug: "match-comparison",
  definition: "how a clause weighs what it tests against what it holds",
  values: ["is", "is-not", "on-or-after", "is-before"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A clause holding several values passes where any one of them matches.",
    },
    {
      invariantKind: "departure",
      statement: "Only a clause testing a date compares by `on-or-after` or `is-before`.",
    },
  ],
} as const satisfies SelectProperty

export type MatchComparison = (typeof matchComparison.values)[number]
