import type { Module } from "@akasha/code-system/module"

export const inventoryRulesRescanRef = {
  id: "01a06258-b533-7b5c-b837-e57e670fe046",
  pageTypeSlug: "module",
  slug: "inventory-rules-rescan-ref",
  definition: "a holder for the rescan function, so a module lower in the tree can call it",
  code: "ts",
} as const satisfies Module
