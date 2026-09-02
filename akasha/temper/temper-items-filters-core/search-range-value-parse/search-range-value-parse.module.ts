import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const searchRangeValueParse = {
  id: "01a0613a-e0ac-785c-a9b6-1aa6dca2564d",
  pageTypeSlug: "module",
  slug: "search-range-value-parse",
  definition:
    "the narrowing of an unknown saved value into a number with an optional comparison operator",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "parseRangeValue returns undefined when the raw value has no numeric value field.",
    },
    {
      invariantKind: "constraint",
      statement: "The accepted operators are the six comparison operators the rule layer names.",
    },
    {
      invariantKind: "absence",
      statement: "No default operator is supplied here.",
    },
  ],
} as const satisfies Module
