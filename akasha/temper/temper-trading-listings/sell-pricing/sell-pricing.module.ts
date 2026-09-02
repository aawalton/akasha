import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const sellPricing = {
  id: "01a060c0-0b9f-7135-8c4b-e497247c8a35",
  pageTypeSlug: "module",
  slug: "sell-pricing",
  definition: "what to ask for an item, and the key its market price is filed under",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "What the item last sold for outranks what the market says.",
    },
    {
      invariantKind: "departure",
      statement: "What the market says outranks a multiple of what the vendor pays.",
    },
    {
      invariantKind: "departure",
      statement: "An item's price key is built from the fields its own kind is priced by.",
    },
    {
      invariantKind: "departure",
      statement: "An item link that parses to nothing is its own price key.",
    },
  ],
} as const satisfies Module
