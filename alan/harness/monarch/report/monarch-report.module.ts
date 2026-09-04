import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchReport = {
  id: "01a06867-e5ed-751c-b661-1084d5afcf9e",
  pageTypeSlug: "module",
  slug: "monarch-report",
  definition: "what the rules would do to the history, said as evidence rather than as a proposal",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Nothing is written; the report says what would happen and stops.",
    },
    {
      invariantKind: "departure",
      statement:
        "A transaction reached by several rules is decided by the first, and the rest are reported as shadowed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule is scored only inside the trusted window, because categories older than that were not maintained and neither figure would measure the rule.",
    },
    {
      invariantKind: "departure",
      statement:
        "A disagreement inside the window is shown in full, because those are the ones worth arguing about.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reserving rule is reported by what category already stands on what it caught, grouped by the bank's own words, because that is where one merchant carrying two kinds of money shows.",
    },
    {
      invariantKind: "departure",
      statement:
        "An ambiguity is reported with every candidate, and a candidate outside the history read is said to be outside it.",
    },
    {
      invariantKind: "departure",
      statement:
        "What no rule reached is reported by merchant as evidence rather than as a proposal.",
    },
    {
      invariantKind: "departure",
      statement: "A list cut to its limit says how many more there were.",
    },
  ],
} as const satisfies Module
