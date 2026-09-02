import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryRuleClassify = {
  id: "01a06100-3bec-7153-ba2d-05f05d4385d3",
  pageTypeSlug: "module",
  slug: "inventory-rule-classify",
  definition:
    "whether a rule belongs on a character card, on a companion card or on a category card",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule the automation settings control is classed by the id those settings gave.",
    },
    {
      invariantKind: "departure",
      statement: "A rule equipping a companion belongs on a companion card.",
    },
    {
      invariantKind: "departure",
      statement: "A rule matching neither character nor companion belongs on a category card.",
    },
  ],
} as const satisfies Module
