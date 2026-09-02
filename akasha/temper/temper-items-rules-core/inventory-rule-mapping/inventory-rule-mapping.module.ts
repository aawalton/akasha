import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryRuleMapping = {
  id: "01a0615c-1e0f-7d27-ab92-82119f712c91",
  pageTypeSlug: "module",
  slug: "inventory-rule-mapping",
  definition: "the game addon's inventory settings written out from the saved rules",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A setting the rules leave unsaid keeps the value the settings already hold.",
    },
  ],
} as const satisfies Module
