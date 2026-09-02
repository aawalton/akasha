import type { EsoInterface } from "@akasha/code-system/eso-interface"

export const inventoryBrowserLayout = {
  id: "01a06258-b536-7f91-93ad-578be9d86a82",
  pageTypeSlug: "eso-interface",
  slug: "inventory-browser-layout",
  definition: "the row template the cross-character browser's scroll list is built from",
  markup: "xml",
  loadedAs: "TemperInventoryBrowser.xml",
} as const satisfies EsoInterface
