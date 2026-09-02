import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const listingTypes = {
  id: "01a060a7-02f2-7740-a4a8-e0a86342e424",
  pageTypeSlug: "module",
  slug: "listing-types",
  definition: "the shape a guild store listing takes where the add-on saves it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A listing carries the price for the stack and the price for one item.",
    },
    {
      invariantKind: "departure",
      statement: "A listing carries the second of capture.",
    },
  ],
} as const satisfies Module
