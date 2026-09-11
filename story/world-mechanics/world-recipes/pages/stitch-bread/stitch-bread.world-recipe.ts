import type { WorldRecipe } from "akasha/story/world-mechanics/world-recipes/world-recipe.page-type.types.ts"

export const stitchBread = {
  id: "01a0655a-7b80-7353-b851-1b4ebc73c378",
  type: "world-recipe",
  slug: "stitch-bread",
  title: "Stitch-bread",
  world: "the-wandering-inn",
} as const satisfies WorldRecipe
