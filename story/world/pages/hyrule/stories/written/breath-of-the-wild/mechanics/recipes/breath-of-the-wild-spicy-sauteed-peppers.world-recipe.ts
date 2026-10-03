import type { WorldRecipe } from "akasha/story/world/mechanics/recipes/world-recipe.page-type.types.ts"

export const breathOfTheWildSpicySauteedPeppers = {
  id: "01a10331-b562-743c-ac54-7e17a5de43c1",
  type: "page-type/world-recipe",
  slug: "breath-of-the-wild-spicy-sauteed-peppers",
  title: "Spicy Sauteed Peppers",
  world: "world/hyrule",
  description:
    "Three spicy peppers cooked together; restores three hearts and gives level 1 cold resistance for 6:30.",
} as const satisfies WorldRecipe
