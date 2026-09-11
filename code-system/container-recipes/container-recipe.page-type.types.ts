import type { Composing } from "akasha/code-system/container-recipes/properties/composing.module-property-group.ts"
import type { Recipe } from "akasha/code-system/container-recipes/properties/recipe.file-property.types.ts"
import type { RecipeRepository } from "akasha/code-system/container-recipes/properties/recipe-repository.text-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type ContainerRecipe = Domain & {
  recipe: Recipe
  composing?: Composing
  repository?: RecipeRepository
}
