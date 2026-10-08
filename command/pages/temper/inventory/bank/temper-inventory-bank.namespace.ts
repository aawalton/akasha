import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const temperInventoryBank = {
  id: "01a07c17-45ff-7886-a216-f19258604709",
  type: "page-type/namespace",
  slug: "temper-inventory-bank",
  definition: "what a character keeps in the bank",
  parts: ["command/temper-inventory-bank-profile", "command/temper-inventory-bank-trace"],
  name: "bank",
  createdAt: "2026-09-07T13:38:15.167Z",
  updatedAt: "2026-09-15T15:51:21.000Z",
} as const satisfies Namespace
