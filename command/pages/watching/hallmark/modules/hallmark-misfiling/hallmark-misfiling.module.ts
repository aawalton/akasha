import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hallmarkMisfiling = {
  id: "01a174a5-93ba-7acb-819d-69607d5827a2",
  type: "page-type/module",
  slug: "hallmark-misfiling",
  definition: "the show pages a refused TMDB match left where a listed Hallmark film belongs",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A show page is misfiled where a listed film has its title and year and a refused match made it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A misfiled show page sits on a Hallmark shelf and states no other TMDB id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A misfiled show page goes with the seasons and episodes under it.",
    },
  ],
  createdAt: "2026-10-25T19:59:30.746Z",
  updatedAt: "2026-10-25T19:59:30.746Z",
} as const satisfies Module
