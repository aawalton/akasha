import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const rollSchema = {
  id: "01a05b71-e544-7a26-aad9-f2f5d9f86734",
  pageTypeSlug: "module",
  slug: "roll-schema",
  definition: "the dice a game rolls, what they came up, and the record kept of the throw",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A roll's record carries the seed the roll was thrown from.",
    },
    {
      invariantKind: "departure",
      statement: "Kept dice are recorded beside the ones that fell away.",
    },
  ],
} as const satisfies Module
