import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryTraitLookup = {
  id: "01a0e0f3-80e9-72bb-b96d-6fc54b4b7e52",
  type: "page-type/module",
  slug: "inventory-trait-lookup",
  definition:
    "each trait by the number the game gives it, and each trait's name, as the addon holds them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The tables are written from the trait and trait map pages as the addon compiles.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A companion trait's numbers are read from the companion trait pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tables are built the first time a trait is asked for, and held after.",
    },
  ],
} as const satisfies Module
