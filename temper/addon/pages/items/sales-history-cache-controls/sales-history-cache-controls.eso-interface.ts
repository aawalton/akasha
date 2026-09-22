import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const salesHistoryCacheControls = {
  id: "01a06197-4c94-772c-a853-2cb06202820a",
  type: "page-type/eso-interface",
  slug: "sales-history-cache-controls",
  definition: "the templates of the status window and the linked icon",
  markup: "xml",
  loadedAs: "guildHistoryCache/controls.xml",
} as const satisfies EsoInterface
