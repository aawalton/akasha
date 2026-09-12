import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const rollSchema = {
  id: "01a05b71-e544-7a26-aad9-f2f5d9f86734",
  type: "module",
  slug: "roll-schema",
  definition: "the dice a game rolls, what they came up, and the record kept of the throw",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A roll's record has the seed the roll was thrown from.",
    },
    {
      invariantKind: "departure",
      statement: "Kept dice are recorded beside the ones that fell away.",
    },
  ],
} as const satisfies Module
