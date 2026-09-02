import type { Module } from "@akasha/code-system/module"

export const watcherPricingTables = {
  id: "01a06381-35cf-7f9a-8a86-81d472cd7c24",
  pageTypeSlug: "module",
  slug: "watcher-pricing-tables",
  definition: "the currency rates and crown replacement costs handed to the inventory addon",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "stopgap",
      statement: "Both tables come back empty.",
    },
    {
      invariantKind: "departure",
      statement: "Every run says the tables are empty rather than saying it once.",
    },
    {
      invariantKind: "departure",
      statement: "What is said goes to the watcher log rather than to the console.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may hand in what is said to.",
    },
    {
      invariantKind: "gap",
      statement: "The rates come from the currency price lookup the pricing package carries.",
    },
    {
      invariantKind: "gap",
      statement: "The costs come from the crown consumable price lookup that package carries.",
    },
    {
      invariantKind: "gap",
      statement: "A crown consumable with no price is left out rather than valued at nothing.",
    },
  ],
} as const satisfies Module
