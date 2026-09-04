import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const rng = {
  id: "01a05bc6-fa4a-7008-b5ab-2cc69317c300",
  pageTypeSlug: "module",
  slug: "rng",
  definition: "the dice a seed gives, and which dice a combatant is rolled with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seed gives the same sequence every time the seed is handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A combatant saying nothing about its dice is rolled with two ten-sided ones.",
    },
    {
      invariantKind: "departure",
      statement: "The highest total a roll can reach is a critical.",
    },
    {
      invariantKind: "departure",
      statement: "The lowest total a roll can reach is a fumble.",
    },
  ],
} as const satisfies Module
