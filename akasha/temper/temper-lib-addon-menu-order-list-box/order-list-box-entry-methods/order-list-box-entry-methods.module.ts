import type { Module } from "@akasha/code-system/module"

export const orderListBoxEntryMethods = {
  id: "01a06207-bdf3-746a-a7b6-8ad6ebf5a361",
  pageTypeSlug: "module",
  slug: "order-list-box-entry-methods",
  definition: "the methods adding one entry to the list and taking one away",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An entry is found by its index or by its unique key.",
    },
    {
      invariantKind: "departure",
      statement:
        "An entry index handed in by a caller starts at the first row rather than at zero.",
    },
  ],
} as const satisfies Module
