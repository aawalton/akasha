import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tamrielTomesBuyAll = {
  id: "01a0de5f-77d5-7f45-aa4e-1e5ac881f98f",
  type: "page-type/module",
  slug: "tamriel-tomes-buy-all",
  definition:
    "buying every Tamriel Tome reward the player can afford, from a key on the Tomes screen",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing is bought until the player presses the key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the active Tome's rewards are bought.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Rewards are bought lowest tier first, one at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reward the points left cannot pay for is passed over, and a cheaper one after it is bought.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No reward that repeats without end is bought.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Full bags stop the buying.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What was bought and what it cost is said in chat once the buying stops.",
    },
  ],
} as const satisfies Module
