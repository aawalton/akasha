import type { Composing } from "akasha/code-system/container-recipes/properties/composing.module-property-group.ts"
import type { Recipe } from "akasha/code-system/container-recipes/properties/recipe.file-property.ts"
import type { RecipeContext } from "akasha/code-system/container-recipes/properties/recipe-context.text-property.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"
import type { ImageRepository } from "akasha/infrastructure/container-image/dockerfiles/built-images/properties/image-repository.text-property.ts"

export type ContainerRecipe = Domain & {
  recipe: Recipe
  composing?: Composing
  context?: RecipeContext
  repository?: ImageRepository
}
