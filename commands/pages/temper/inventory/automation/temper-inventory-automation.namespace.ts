import type { Namespace } from "../../../../namespaces/namespace.page-type.types.ts"

export const temperInventoryAutomation = {
  id: "01a07c17-39c8-7ac1-bab7-bbb2882c1f54",
  pageTypeSlug: "namespace",
  type: "namespace",
  slug: "temper-inventory-automation",
  definition: "what an inventory does without being asked",
  parts: ["command/temper-inventory-automation-set", "command/temper-inventory-automation-show"],
} as const satisfies Namespace
