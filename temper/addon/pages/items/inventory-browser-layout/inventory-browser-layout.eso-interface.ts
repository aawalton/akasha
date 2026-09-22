import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const inventoryBrowserLayout = {
  id: "01a06258-b536-7f91-93ad-578be9d86a82",
  type: "page-type/eso-interface",
  slug: "inventory-browser-layout",
  definition: "the row template the cross-character browser's scroll list is built from",
  markup: "xml",
  loadedAs: "TemperItemsBrowser.xml",
} as const satisfies EsoInterface
