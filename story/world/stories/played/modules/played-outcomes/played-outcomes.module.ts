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
      statement: "A turn's cards are drawn before its first paragraph.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A chapter's cards are drawn before the paragraph the turn each line names starts at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter line whose turn the chapter kept no start for draws no card.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A card shows the actor, the action, the skill, the difficulty, the outcome tier and the terms.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The actor is the character the line's reading names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A card whose roll named a page stating it is unrevealed leaves out that page's name and term.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A card is known again by its line's seed.",
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
  updatedAt: "2026-10-28T17:55:07.494Z",
} as const satisfies Module
