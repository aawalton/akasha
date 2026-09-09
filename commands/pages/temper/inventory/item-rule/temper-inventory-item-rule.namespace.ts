import type { Namespace } from "../../../../namespaces/namespace.page-type.ts"

export const temperInventoryItemRule = {
  id: "01a07c17-5eb8-7d4b-ba4c-23360de21f42",
  pageTypeSlug: "namespace",
  slug: "temper-inventory-item-rule",
  definition: "the rules saying where one item goes",
  parts: [
    "command/temper-inventory-item-rule-create",
    "command/temper-inventory-item-rule-delete",
    "command/temper-inventory-item-rule-duplicate",
    "command/temper-inventory-item-rule-list",
    "command/temper-inventory-item-rule-lock",
    "command/temper-inventory-item-rule-show",
    "command/temper-inventory-item-rule-unlock",
    "command/temper-inventory-item-rule-update",
  ],
} as const satisfies Namespace
