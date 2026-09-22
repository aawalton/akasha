import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const diceRolling = {
  id: "01a0c5f7-fd70-7b67-ab29-7b3be9723b2a",
  type: "page-type/module",
  slug: "dice-rolling",
  definition: "the faces a handful of dice shows for a seed",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One seed shows one set of faces, every time that seed is asked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A handful is said as how many dice, a `d`, and how many sides.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number that would leave some faces likelier than others is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A handful larger than a game rolls is refused rather than rolled.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here settles a seed or reads what the faces come to.",
    },
  ],
} as const satisfies Module
