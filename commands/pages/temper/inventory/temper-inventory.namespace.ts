import type { Namespace } from "../../../namespaces/namespace.page-type.types.ts"

export const temperInventory = {
  id: "01a07c18-25b3-7c50-9fbe-24e618f94df7",
  pageTypeSlug: "namespace",
  type: "namespace",
  slug: "temper-inventory",
  definition: "what a character has, and where each thing carried belongs",
  parts: [
    "command/temper-inventory-capacity-audit",
    "command/temper-inventory-decode-link",
    "command/temper-inventory-explain",
    "command/temper-inventory-knowledge",
    "command/temper-inventory-lookup-item",
    "command/temper-inventory-parity",
    "command/temper-inventory-plan",
    "command/temper-inventory-replay-explain",
    "command/temper-inventory-rules",
    "command/temper-inventory-snapshot",
    "namespace/temper-inventory-automation",
    "namespace/temper-inventory-bank",
    "namespace/temper-inventory-buy-rule",
    "namespace/temper-inventory-item-rule",
    "namespace/temper-inventory-master",
    "namespace/temper-inventory-rule",
  ],
} as const satisfies Namespace
