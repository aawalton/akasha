import type { WorldRecipe } from "../../world-recipe.page-type.ts"

export const loafOfLuck = {
  id: "01a0655a-7b80-7227-a457-1d3a3175f0fa",
  pageTypeSlug: "world-recipe",
  slug: "loaf-of-luck",
  title: "Loaf of Luck",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldRecipe
