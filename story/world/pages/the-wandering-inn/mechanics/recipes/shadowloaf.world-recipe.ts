import type { WorldRecipe } from "akasha/story/world/mechanics/recipes/world-recipe.page-type.types.ts"

export const shadowloaf = {
  id: "01a0655a-7b80-7d74-a783-5fb2bc809ccd",
  type: "page-type/world-recipe",
  slug: "shadowloaf",
  title: "Shadowloaf",
  world: "world/the-wandering-inn",
} as const satisfies WorldRecipe
