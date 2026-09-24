import type { Composing } from "akasha/code/container-recipe/properties/composing.module-property-group.ts"
import type { Recipe } from "akasha/code/container-recipe/properties/recipe.file-property.types.ts"
import type { RecipeRepository } from "akasha/code/container-recipe/properties/recipe-repository.text-property.types.ts"
import type { AkashaService } from "akasha/infrastructure/service/akasha-service/akasha-service.page-type.types.ts"

export type ContainerRecipe = AkashaService & {
  recipe: Recipe
  composing?: Composing
  repository?: RecipeRepository
}
