import type { Module } from "@akasha/code-system/module"

export const orderListBoxListMethods = {
  id: "01a06207-bdf5-7038-be7e-efe5d5472cf1",
  pageTypeSlug: "module",
  slug: "order-list-box-list-methods",
  definition: "the methods filling, refreshing and reordering the rows of the list",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row's position is read off the list rather than kept on the row.",
    },
    {
      invariantKind: "departure",
      statement: "Reordering the rows rewrites the caller's entry list in place.",
    },
  ],
} as const satisfies Module
