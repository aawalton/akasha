import type { WorldRecipe } from "akasha/story/world-mechanic/world-recipe/world-recipe.page-type.types.ts"

export const krakenBiscuit = {
  id: "01a0655a-7b80-7128-8388-54e9439d0ac1",
  type: "world-recipe",
  slug: "kraken-biscuit",
  title: "Kraken Biscuit",
  world: "world/the-wandering-inn",
} as const satisfies WorldRecipe
