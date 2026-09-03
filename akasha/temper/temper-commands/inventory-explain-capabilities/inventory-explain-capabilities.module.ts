import type { Module } from "@akasha/code-system/module"

export const inventoryExplainCapabilities = {
  id: "01a068f6-dee0-7da2-a584-f25c20a493a6",
  pageTypeSlug: "module",
  slug: "inventory-explain-capabilities",
  definition: "what explaining one item's rule walk is built from",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The parts an explanation needs are handed over together rather than one by one.",
    },
    {
      invariantKind: "departure",
      statement: "An item asked for without a character is looked for in the newest place first.",
    },
    {
      invariantKind: "departure",
      statement: "Every item in every bag is reached with the place it is held in.",
    },
    {
      invariantKind: "absence",
      statement: "No rule walk is run here.",
    },
  ],
} as const satisfies Module
