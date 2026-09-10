import type { Namespace } from "../../../../namespaces/namespace.page-type.types.ts"

export const temperInventoryBank = {
  id: "01a07c17-45ff-7886-a216-f19258604709",
  pageTypeSlug: "namespace",
  type: "namespace",
  slug: "temper-inventory-bank",
  definition: "what a character keeps in the bank",
  parts: ["command/temper-inventory-bank-profile", "command/temper-inventory-bank-trace"],
} as const satisfies Namespace
