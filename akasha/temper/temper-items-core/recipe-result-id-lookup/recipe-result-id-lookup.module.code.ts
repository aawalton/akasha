import { RECIPE_DATA } from "@akasha/temper-completion/recipe-data"

const recipeNameToResultId: ReadonlyMap<string, number> = new Map(
  RECIPE_DATA.flatMap((list) => list.recipes.map((recipe) => [recipe.name, recipe.itemId] as const))
)

export function getRecipeResultId(itemName: string): number | undefined {
  const colonIndex = itemName.indexOf(": ")
  if (colonIndex === -1) return undefined
  const bareName = itemName.slice(colonIndex + 2)
  return recipeNameToResultId.get(bareName)
}
