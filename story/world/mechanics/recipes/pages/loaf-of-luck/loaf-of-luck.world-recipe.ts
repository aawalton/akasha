import type { WorldRecipe } from "akasha/story/world/mechanics/recipes/world-recipe.page-type.types.ts"

export const loafOfLuck = {
  id: "01a0655a-7b80-7227-a457-1d3a3175f0fa",
  type: "page-type/world-recipe",
  slug: "loaf-of-luck",
  title: "Loaf of Luck",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldRecipe
