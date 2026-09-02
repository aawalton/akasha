import type { Module } from "@akasha/code-system/module"

export const inventoryBrowserLocations = {
  id: "01a06258-b529-7eb5-b709-e755480984f0",
  pageTypeSlug: "module",
  slug: "inventory-browser-locations",
  definition: "which browser rows fall inside a location view, and how many are held there",
  code: "ts",
} as const satisfies Module
