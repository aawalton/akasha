import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const crownConsumablePriceLookup = {
  id: "01a0609b-e59f-7038-8111-df7fe90b47d8",
  pageTypeSlug: "module",
  slug: "crown-consumable-price-lookup",
  definition: "what a crown store consumable would cost bought from a guild store instead",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A crown item is known by its name opening `Crown ` or `Gold Coast `.",
    },
    {
      invariantKind: "departure",
      statement: "A crown item without a priced equivalent answers with the reason for the miss.",
    },
    {
      invariantKind: "departure",
      statement: "Where a branch holds several prices the dearest is taken.",
    },
  ],
} as const satisfies Module
