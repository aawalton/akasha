import type { Module } from "@akasha/code-system/module"

export const inventoryEntry = {
  id: "01a06258-b52d-7ecd-9d08-c31b990196a5",
  pageTypeSlug: "module",
  slug: "inventory-entry",
  definition:
    "the add-on's first module, which starts the scans, the panels, the browser and the chat commands",
  code: "ts",
} as const satisfies Module
