import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const diceReading = {
  id: "01a0c480-e32d-7929-bdd9-14a102e071a3",
  type: "page-type/module",
  slug: "dice-reading",
  definition: "the total a handful of dice came to, and whether it is the best or the worst",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A handful holding the wrong number of dice is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A face a die of those sides cannot show is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The best a handful can come to is a critical, and the worst is a fumble.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here rolls a die.",
    },
  ],
} as const satisfies Module
