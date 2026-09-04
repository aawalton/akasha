import type { Module } from "../../code-system/modules/module.page-type.ts"

export const seatTabContext = {
  id: "01a0686b-bfe9-74a9-988e-2d1c89ebe36f",
  pageTypeSlug: "module",
  slug: "seat-tab-context",
  definition: "the terminal tabs a seat stands in, published as the contexts a menu reads",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A tab holding a seat is named by the tab's instance id.",
    },
    {
      invariantKind: "departure",
      statement: "Every key is answered, empty where no tab matches it.",
    },
    {
      invariantKind: "departure",
      statement: "A tab is filed under running or under stopped.",
    },
    {
      invariantKind: "departure",
      statement: "A tab is filed under the place the seat in it holds.",
    },
    {
      invariantKind: "departure",
      statement: "A tab whose seat names no place is filed as headless.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here publishes a context.",
    },
  ],
} as const satisfies Module
