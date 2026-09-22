import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const craftingFonts = {
  id: "01a061c7-e8c0-7c94-9c43-2face07e8a6c",
  type: "page-type/eso-interface",
  slug: "crafting-fonts",
  definition: "the crafting windows' fonts",
  markup: "xml",
  loadedAs: "XML/UI/CraftingFonts.xml",
} as const satisfies EsoInterface
