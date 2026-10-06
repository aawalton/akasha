import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const spokenMatching = {
  id: "01a111d0-25ba-73e8-80c1-16453a05be40",
  type: "page-type/module",
  slug: "spoken-matching",
  definition: "the words on a screen that a sentence being read aloud is",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A word is matched by its letters and digits, whatever marks and case it is drawn with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A sentence is found by its first words, and by fewer where the screen draws them otherwise.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Where a sentence's first words come twice, the one nearest its place in the prose is it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sentence whose end is not marked yet runs to the first word ending a sentence.",
    },
  ],
} as const satisfies Module
