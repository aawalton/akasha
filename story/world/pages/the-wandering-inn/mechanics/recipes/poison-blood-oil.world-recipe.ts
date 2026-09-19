import type { WorldRecipe } from "akasha/story/world/mechanics/recipes/world-recipe.page-type.types.ts"

export const poisonBloodOil = {
  id: "01a0655a-7b80-7eee-b83b-d183e23a4b63",
  type: "page-type/world-recipe",
  slug: "poison-blood-oil",
  title: "Poison Blood Oil",
  world: "world/the-wandering-inn",
} as const satisfies WorldRecipe
