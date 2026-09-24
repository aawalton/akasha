import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { RecipeItemId } from "akasha/temper/catalog/pursuit/temper-recipe-list/properties/recipe-item-id.number-property.types.ts"
import type { RecipeName } from "akasha/temper/catalog/pursuit/temper-recipe-list/properties/recipe-name.text-property.types.ts"

export type Recipes = "jsonl"

export type RecipesRow = {
  id: Id
  recipeItemId: RecipeItemId
  recipeName: RecipeName
}
