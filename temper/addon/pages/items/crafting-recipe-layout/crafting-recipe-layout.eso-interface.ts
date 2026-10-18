import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const craftingRecipeLayout = {
  id: "01a061c7-e8c1-72fd-9fdd-9a22ca56f843",
  type: "page-type/eso-interface",
  slug: "crafting-recipe-layout",
  definition: "the recipe window and its list",
  markup: "xml",
  loadedAs: "XML/UI/CraftingRecipe.xml",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The hide toggles are left-aligned between the headline and the search box, so their boxes line up.",
    },
  ],
  createdAt: "2026-09-02T11:01:26.337Z",
  updatedAt: "2026-10-18T19:59:13.850Z",
} as const satisfies EsoInterface
