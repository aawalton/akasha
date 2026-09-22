import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const craftingRuneLayout = {
  id: "01a061c7-e8c2-730b-b59e-12d4f326110c",
  type: "page-type/eso-interface",
  slug: "crafting-rune-layout",
  definition: "the enchanting window, its rune grid and its mode buttons",
  markup: "xml",
  loadedAs: "XML/UI/CraftingRune.xml",
} as const satisfies EsoInterface
