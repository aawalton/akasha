import type { Module } from "@akasha/code-system/module"

export const slashCommanderCasts = {
  id: "01a06066-8403-7a32-b1b3-df88bb610cb2",
  pageTypeSlug: "module",
  slug: "slash-commander-casts",
  definition: "what a value out of the game's chat tables or a caller's hand is read as",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A cast is made only after the library has checked the value's kind.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here checks a value at run time.",
    },
  ],
} as const satisfies Module
