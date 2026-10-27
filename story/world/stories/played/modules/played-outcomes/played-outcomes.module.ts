import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playedOutcomes = {
  id: "01a17f17-a624-750a-8f8f-1981835a0656",
  type: "page-type/module",
  slug: "played-outcomes",
  definition: "the card a played turn shows for each action its tiered roll settled",
  code: "tsx",
  test: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A card heads the turn its line is beside, above that turn's prose.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A card shows the skill, the action's difficulty, the outcome tier and the terms.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story's difficulty level other than Normal is shown as one more term.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No card shows the dice, the score or the odds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The outcomes are read beside each turn as the prose is, and follow it live.",
    },
  ],
  createdAt: "2026-10-27T20:40:18.723Z",
  updatedAt: "2026-10-27T20:40:18.723Z",
} as const satisfies Module
