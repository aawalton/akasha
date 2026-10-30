import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const matchComparison = {
  id: "01a0680c-3c00-7001-a763-8d2f5b9e3102",
  type: "page-type/select-property",
  slug: "match-comparison",
  propertySlug: "comparison",
  definition:
    "how a category rule compares a part of a transaction with the values the rule looks for",
  values: ["is", "is-not", "on-or-after", "is-before"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A clause with several values passes where a single value matches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a clause testing a date compares by `on-or-after` or `is-before`.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T16:13:47.392Z",
  updatedAt: "2026-10-30T15:44:26.378Z",
} as const satisfies SelectProperty
