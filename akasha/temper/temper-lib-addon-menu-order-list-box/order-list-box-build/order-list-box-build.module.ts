import type { Module } from "@akasha/code-system/module"

export const orderListBoxBuild = {
  id: "01a06207-bded-733f-a70c-c2a4d78de1d0",
  pageTypeSlug: "module",
  slug: "order-list-box-build",
  definition: "the widget object built from a caller's data, with its scroll list and rows",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One scroll list holds every row of one order list box.",
    },
    {
      invariantKind: "departure",
      statement: "A row carries the entry shown rather than the index of the row.",
    },
  ],
} as const satisfies Module
