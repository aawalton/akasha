import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const craftingBlueprintLayout = {
  id: "01a061c7-e8bf-7fc9-acb8-3f819b78d2e8",
  type: "page-type/eso-interface",
  slug: "crafting-blueprint-layout",
  definition: "the furnishing-blueprint window and its list",
  markup: "xml",
  loadedAs: "XML/UI/CraftingBlueprint.xml",
} as const satisfies EsoInterface
