import type { WorldRecipe } from "../world-recipe.page-type.ts"

export const yuckBomb = {
  id: "01a0655a-7b80-752a-9391-00e8523f7e60",
  pageTypeSlug: "world-recipe",
  slug: "yuck-bomb",
  title: "Yuck Bomb",
  worldSlug: "the-wandering-inn",
} as const satisfies WorldRecipe
