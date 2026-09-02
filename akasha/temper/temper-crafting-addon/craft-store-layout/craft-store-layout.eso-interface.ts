import type { EsoInterface } from "@akasha/code-system/eso-interface"

export const craftStoreLayout = {
  id: "01a061c7-e8c1-7978-81b3-f8b93588d643",
  pageTypeSlug: "eso-interface",
  slug: "craft-store-layout",
  definition:
    "the main crafting panel: its buttons, its character rows and the windows behind them",
  markup: "xml",
  loadedAs: "XML/UI/CraftStore.xml",
} as const satisfies EsoInterface
