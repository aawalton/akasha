import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const traitsFilter = {
  id: "01a0615c-1e11-7b74-a805-3a2271d63ffb",
  pageTypeSlug: "module",
  slug: "traits-filter",
  definition: "the Traits condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This filter reads and writes the `traits` condition alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "The traits offered are the traits the item family named by the category can carry.",
    },
  ],
} as const satisfies Module
