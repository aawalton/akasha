import type { Module } from "@akasha/code-system/module"

export const inventoryBuildItemFacts = {
  id: "01a06258-b529-71ba-8496-6c343352f8de",
  pageTypeSlug: "module",
  slug: "inventory-build-item-facts",
  definition: "the facts about one item that the rule evaluator judges, read from a slot or a link",
  code: "ts",
} as const satisfies Module
