import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const temperInventoryRule = {
  id: "01a07c17-78b9-7671-8f3d-fd5136036a25",
  type: "page-type/namespace",
  slug: "temper-inventory-rule",
  definition: "an inventory's rules",
  parts: [
    "command/temper-inventory-rule-create",
    "command/temper-inventory-rule-delete",
    "command/temper-inventory-rule-duplicate",
    "command/temper-inventory-rule-list",
    "command/temper-inventory-rule-lock",
    "command/temper-inventory-rule-reorder",
    "command/temper-inventory-rule-show",
    "command/temper-inventory-rule-takes",
    "command/temper-inventory-rule-unlock",
    "command/temper-inventory-rule-update",
  ],
  name: "rule",
  createdAt: "2026-09-07T13:38:28.153Z",
  updatedAt: "2026-09-22T13:44:00.000Z",
} as const satisfies Namespace
