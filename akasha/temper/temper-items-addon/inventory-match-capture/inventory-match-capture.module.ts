import type { Module } from "@akasha/code-system/module"

export const inventoryMatchCapture = {
  id: "01a06267-2a3a-7dc8-bf2a-522bd085d72f",
  pageTypeSlug: "module",
  slug: "inventory-match-capture",
  definition: "the string a Lua pattern capture holds, or null where the capture is empty",
  code: "ts",
} as const satisfies Module
