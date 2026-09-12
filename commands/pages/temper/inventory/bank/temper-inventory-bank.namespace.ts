import type { Namespace } from "akasha/commands/namespaces/namespace.page-type.types.ts"

export const temperInventoryBank = {
  id: "01a07c17-45ff-7886-a216-f19258604709",
  type: "namespace",
  slug: "temper-inventory-bank",
  definition: "what a character keeps in the bank",
  parts: ["command/temper-inventory-bank-profile", "command/temper-inventory-bank-trace"],
  name: "bank",
} as const satisfies Namespace
