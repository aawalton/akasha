import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryRuleTraitResearch = {
  id: "01a06276-e3e7-7361-a8b3-36d14843bf91",
  pageTypeSlug: "module",
  slug: "inventory-rule-trait-research",
  definition: "whether any character still has an item's trait left to research",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An item whose crafting type cannot be inferred is researchable by nobody.",
    },
    {
      invariantKind: "departure",
      statement: "A trait absent from a character's record counts as neither known nor unknown.",
    },
  ],
} as const satisfies Module
