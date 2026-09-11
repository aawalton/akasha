import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const rulebookSchema = {
  id: "01a05b71-e544-70e3-9bbf-39b05dfb3b6d",
  type: "module",
  slug: "rulebook-schema",
  definition: "a game's mechanics, from its attributes through its dice to how a strike resolves",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rulebook is read out of the mechanics key of a game's declaration.",
    },
  ],
} as const satisfies Module
