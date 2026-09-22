import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const checkCache = {
  id: "01a0c4b1-0000-7000-8000-6d3e5a17c284",
  type: "page-type/module",
  slug: "check-cache",
  definition: "what a check keeps beside its own page from one run to the next",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A cache sits beside the page of the check that keeps it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is one JSON value on a line of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cache that is not there is taken as nothing rather than as no row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cache holding a line that is no JSON value is taken as nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cache is put in place whole, so a reader reads it as it was or as it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cache already holding what would be written is left alone.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says what a check keeps or when a check keeps it.",
    },
  ],
} as const satisfies Module
