import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesDispatchVendor = {
  id: "01a06258-b532-7d2c-96c6-42f3ce92a045",
  type: "page-type/module",
  slug: "inventory-rules-dispatch-vendor",
  definition: "selling, fencing and laundering items at a store by rule",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A fence has work where the backpack holds stolen junk or an item to fence or launder.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Whether a fence has work ignores how many sells and launders are left today.",
    },
  ],
} as const satisfies Module
