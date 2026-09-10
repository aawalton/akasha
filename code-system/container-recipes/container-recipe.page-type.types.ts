import type { Domain } from "../../domains/domain.page-type.types.ts"
import type { Recipe } from "./properties/recipe.file-property.ts"

export type ContainerRecipe = Domain & {
  recipe: Recipe
}
