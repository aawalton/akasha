import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const questFiling = {
  id: "01a0c6ac-c5d5-741c-8a27-55046d36fc0a",
  type: "page-type/module",
  slug: "quest-filing",
  definition: "the pages an old engine's quests become, one for each quest its state names",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every quest the last state row names becomes a page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A quest the old engine wrote as offered is active.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The conditions a quest carried are folded into its note.",
    },
  ],
} as const satisfies Module
