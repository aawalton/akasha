import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const ttcShoppingOptimizer = {
  id: "01a060cf-b0b0-7518-a8fe-69b071ba12a7",
  pageTypeSlug: "module",
  slug: "ttc-shopping-optimizer",
  definition: "which listings to buy so that the fewest kiosks are visited",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Two items asking the same search ask Tamriel Trade Centre once.",
    },
    {
      invariantKind: "departure",
      statement: "An item with the fewest candidate listings is settled first.",
    },
    {
      invariantKind: "departure",
      statement: "One listing answers one item.",
    },
    {
      invariantKind: "departure",
      statement: "A kiosk holding more of what is still wanted breaks a tie on price.",
    },
    {
      invariantKind: "departure",
      statement: "An item no listing answers comes back among the missing.",
    },
  ],
} as const satisfies Module
