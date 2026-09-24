import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playerAnswerCapture = {
  id: "01a0d578-6f2a-7c6e-973e-02a89d44f80e",
  type: "page-type/module",
  slug: "player-answer-capture",
  definition: "the collector asking the game's functions about the character playing now",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A function is asked with each set of values the character has for its shape.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The bags asked are the worn, backpack, bank, subscriber bank, craft and companion.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a slot holding an item is asked about.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each item link found in those slots is asked about once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value the game names by a constant is read from that constant.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The functions are asked a few values at a time, so the game stays playable.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A function that raises, or answers nothing, is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A function's answers are kept up to the first that is no number, word or truth.",
    },
  ],
} as const satisfies Module
