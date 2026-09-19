import type { WorldRecipe } from "akasha/story/world/mechanics/recipes/world-recipe.page-type.types.ts"

export const yuckBomb = {
  id: "01a0655a-7b80-752a-9391-00e8523f7e60",
  type: "page-type/world-recipe",
  slug: "yuck-bomb",
  title: "Yuck Bomb",
  world: "world/the-wandering-inn",
} as const satisfies WorldRecipe
