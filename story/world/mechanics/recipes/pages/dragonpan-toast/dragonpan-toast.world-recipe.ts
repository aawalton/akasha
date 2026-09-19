import type { WorldRecipe } from "akasha/story/world/mechanics/recipes/world-recipe.page-type.types.ts"

export const dragonpanToast = {
  id: "01a0655a-7b80-7ca9-bb9e-76f26fcb9474",
  type: "page-type/world-recipe",
  slug: "dragonpan-toast",
  title: "Dragonpan Toast",
  world: "world/the-wandering-inn",
} as const satisfies WorldRecipe
