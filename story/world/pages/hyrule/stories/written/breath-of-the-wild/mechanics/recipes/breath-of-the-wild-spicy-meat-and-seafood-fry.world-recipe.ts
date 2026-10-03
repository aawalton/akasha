import type { WorldRecipe } from "akasha/story/world/mechanics/recipes/world-recipe.page-type.types.ts"

export const breathOfTheWildSpicyMeatAndSeafoodFry = {
  id: "01a10331-b562-71cb-901e-e8d3e2d10d72",
  type: "page-type/world-recipe",
  slug: "breath-of-the-wild-spicy-meat-and-seafood-fry",
  title: "Spicy Meat and Seafood Fry",
  world: "world/hyrule",
  description:
    "Raw meat, a Hylian bass and spicy peppers cooked together; restores four hearts and gives cold resistance for 5:30.",
} as const satisfies WorldRecipe
