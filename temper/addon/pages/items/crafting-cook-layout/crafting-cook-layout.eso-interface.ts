import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const craftingCookLayout = {
  id: "01a061c7-e8c0-70d0-b8f9-1d7828460dee",
  type: "page-type/eso-interface",
  slug: "crafting-cook-layout",
  definition: "the provisioning window and its recipe grid",
  markup: "xml",
  loadedAs: "XML/UI/CraftingCook.xml",
} as const satisfies EsoInterface
