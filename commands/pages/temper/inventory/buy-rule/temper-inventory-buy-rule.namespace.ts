import type { Namespace } from "../../../../namespaces/namespace.page-type.ts"

export const temperInventoryBuyRule = {
  id: "01a07c17-524e-7619-8629-d3610a998265",
  pageTypeSlug: "namespace",
  slug: "temper-inventory-buy-rule",
  definition: "the rules saying what a character buys",
  parts: [
    "command/temper-inventory-buy-rule-create",
    "command/temper-inventory-buy-rule-delete",
    "command/temper-inventory-buy-rule-duplicate",
    "command/temper-inventory-buy-rule-list",
    "command/temper-inventory-buy-rule-lock",
    "command/temper-inventory-buy-rule-show",
    "command/temper-inventory-buy-rule-unlock",
    "command/temper-inventory-buy-rule-update",
  ],
} as const satisfies Namespace
