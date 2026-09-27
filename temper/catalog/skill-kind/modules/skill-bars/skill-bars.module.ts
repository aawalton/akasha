import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillBars = {
  id: "01a060db-b2bc-7125-b53b-c0f90c47961f",
  type: "page-type/module",
  slug: "skill-bars",
  definition: "the primary skill bar and the backup skill bar a character swaps",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The skill bars are read from the skill bar pages and held with the skill catalogue.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill bar's place among the bars is its page's display order.",
    },
  ],
} as const satisfies Module
