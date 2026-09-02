import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryDestinationParse = {
  id: "01a06100-3bec-7b79-9779-2c42248a315d",
  pageTypeSlug: "module",
  slug: "inventory-destination-parse",
  definition: "an action name or a destination read out of the text a saved rule holds",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Text naming no known action reads as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Text naming no known destination reads as nothing.",
    },
  ],
} as const satisfies Module
