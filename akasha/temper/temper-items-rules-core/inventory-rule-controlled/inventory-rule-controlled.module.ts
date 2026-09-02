import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryRuleControlled = {
  id: "01a06100-3bee-7018-bc06-5cbc76e051f4",
  pageTypeSlug: "module",
  slug: "inventory-rule-controlled",
  definition:
    "the rules the automation settings write for the player rather than the player writing them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A controlled rule is known by the shape of its id.",
    },
    {
      invariantKind: "departure",
      statement: "A controlled rule is rewritten from the automation settings on every build.",
    },
    {
      invariantKind: "departure",
      statement:
        "A saved rule set carrying an older controlled rule is migrated to the current shape.",
    },
  ],
} as const satisfies Module
