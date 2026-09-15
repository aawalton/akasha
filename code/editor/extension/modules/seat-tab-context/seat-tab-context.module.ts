import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatTabContext = {
  id: "01a0686b-bfe9-74a9-988e-2d1c89ebe36f",
  type: "module",
  slug: "seat-tab-context",
  definition: "the terminal tabs a seat is in, published as the contexts a menu reads",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tab with a seat is named by the tab's instance id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every key is answered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key no tab matches is answered empty.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tab is filed under running or under stopped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tab is filed under the place the seat in that tab has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tab whose seat names no place is filed as headless.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here publishes a context.",
    },
  ],
} as const satisfies Module
