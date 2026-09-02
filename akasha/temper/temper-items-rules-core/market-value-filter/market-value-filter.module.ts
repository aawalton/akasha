import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const marketValueFilter = {
  id: "01a06100-3bf3-7e98-bc03-434a49553e2c",
  pageTypeSlug: "module",
  slug: "market-value-filter",
  definition: "the Market Value condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This filter reads and writes the 4 value conditions named in the code.",
    },
  ],
} as const satisfies Module
