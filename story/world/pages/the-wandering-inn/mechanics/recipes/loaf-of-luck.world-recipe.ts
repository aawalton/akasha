import type { WorldRecipe } from "akasha/story/world/mechanics/recipes/world-recipe.page-type.types.ts"

export const loafOfLuck = {
  id: "01a0655a-7b80-7227-a457-1d3a3175f0fa",
  type: "page-type/world-recipe",
  slug: "loaf-of-luck",
  title: "Loaf of Luck",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T03:40:23.808Z",
  updatedAt: "2026-09-22T13:30:34.000Z",
} as const satisfies WorldRecipe
