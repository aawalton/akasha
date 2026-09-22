import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const craftingLayout = {
  id: "01a061c7-e8c1-7978-81b3-f8b93588d643",
  type: "page-type/eso-interface",
  slug: "crafting-layout",
  definition:
    "the main crafting panel: its buttons, its character rows and the windows behind them",
  markup: "xml",
  loadedAs: "XML/UI/CraftingMain.xml",
} as const satisfies EsoInterface
