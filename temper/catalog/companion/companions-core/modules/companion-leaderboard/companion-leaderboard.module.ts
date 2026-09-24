import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionLeaderboard = {
  id: "01a06152-c2ca-7bf7-a6bf-86af486302c4",
  type: "page-type/module",
  slug: "companion-leaderboard",
  definition: "ranking of companion builds by score across base role combinations",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A build scores through the support optimizer when its base roles include support.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A build ranks only when its visibility is public.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Target filters apply only to combinations that include the damage role.",
    },
  ],
} as const satisfies Module
