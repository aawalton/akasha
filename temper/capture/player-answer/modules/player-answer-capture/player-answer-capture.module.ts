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
      statement: "Each action a key can be bound to is asked about by its name, for every device.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every setting id up to 127 is asked about under every setting system.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game's own setting ids all fall below 100.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Walking the game's globals touches its private functions, which the game refuses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The functions are asked a few values at a time, so the game stays playable.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A function that raises is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A function that answers nothing is kept as answering nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer of nothing but false, zero or empty text is passed over.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Every answer kept of every item link weighed tens of megabytes in the saved file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A function's answers are kept up to the first that is no number, word or truth.",
    },
  ],
} as const satisfies Module
