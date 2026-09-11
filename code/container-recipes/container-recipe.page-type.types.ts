import type { Composing } from "akasha/code/container-recipes/properties/composing.module-property-group.ts"
import type { Recipe } from "akasha/code/container-recipes/properties/recipe.file-property.types.ts"
import type { RecipeRepository } from "akasha/code/container-recipes/properties/recipe-repository.text-property.types.ts"
import type { Service } from "akasha/infrastructure/services/service.page-type.types.ts"

export type ContainerRecipe = Service & {
  recipe: Recipe
  composing?: Composing
  repository?: RecipeRepository
}
