import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const slashCommanderCasts = {
  id: "01a06066-8403-7a32-b1b3-df88bb610cb2",
  type: "page-type/module",
  slug: "slash-commander-casts",
  definition: "what a value out of the game's chat tables or a caller's hand is taken as",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A cast is made only after the library has checked the value's kind.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here checks a value at run time.",
    },
  ],
} as const satisfies Module
