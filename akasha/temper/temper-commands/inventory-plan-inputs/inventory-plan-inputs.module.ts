import type { Module } from "@akasha/code-system/module"

export const inventoryPlanInputs = {
  id: "01a068e2-2271-7832-853b-12f5d89083b0",
  pageTypeSlug: "module",
  slug: "inventory-plan-inputs",
  definition: "everything a rule walk needs, gathered from the two saved variables files",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The inventory and the characters are read from two files rather than one.",
    },
    {
      invariantKind: "departure",
      statement: "A file that cannot be read is refused as data, naming the path.",
    },
    {
      invariantKind: "departure",
      statement: "A compiled rule the addon left unnamed is named for its place in the order.",
    },
    {
      invariantKind: "departure",
      statement: "Stock is counted only for the consumables somebody wants.",
    },
    {
      invariantKind: "departure",
      statement: "A location whose key is not a number is no character.",
    },
    {
      invariantKind: "absence",
      statement: "No item rule is gathered here.",
    },
  ],
} as const satisfies Module
