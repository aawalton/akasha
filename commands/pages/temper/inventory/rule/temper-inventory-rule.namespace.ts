import type { Namespace } from "../../../../namespaces/namespace.page-type.ts"

export const temperInventoryRule = {
  id: "01a07c17-78b9-7671-8f3d-fd5136036a25",
  pageTypeSlug: "namespace",
  slug: "temper-inventory-rule",
  definition: "the rules an inventory is kept by",
  parts: [
    "command/temper-inventory-rule-create",
    "command/temper-inventory-rule-delete",
    "command/temper-inventory-rule-duplicate",
    "command/temper-inventory-rule-list",
    "command/temper-inventory-rule-lock",
    "command/temper-inventory-rule-reorder",
    "command/temper-inventory-rule-show",
    "command/temper-inventory-rule-unlock",
    "command/temper-inventory-rule-update",
  ],
} as const satisfies Namespace
