import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playerAnswerEntry = {
  id: "01a0d578-6f29-7b96-ae38-cb719b7dcbcf",
  type: "page-type/module",
  slug: "player-answer-entry",
  definition: "where the capture of the character starts in the catalog add-on",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The character is asked about once for each time the game client loads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Asking starts a delay after the player first becomes active.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A capture that finishes replaces the answers saved before it whole.",
    },
  ],
} as const satisfies Module
