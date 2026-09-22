import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const craftingRecipeLayout = {
  id: "01a061c7-e8c1-72fd-9fdd-9a22ca56f843",
  type: "page-type/eso-interface",
  slug: "crafting-recipe-layout",
  definition: "the recipe window and its list",
  markup: "xml",
  loadedAs: "XML/UI/CraftingRecipe.xml",
} as const satisfies EsoInterface
