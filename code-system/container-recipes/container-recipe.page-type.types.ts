import type { Domain } from "../../domains/domain.page-type.types.ts"
import type { ImageRepository } from "../../infrastructure/container-image/dockerfiles/built-images/properties/image-repository.text-property.ts"
import type { Composing } from "./properties/composing.module-property-group.ts"
import type { Recipe } from "./properties/recipe.file-property.ts"
import type { RecipeContext } from "./properties/recipe-context.text-property.ts"

export type ContainerRecipe = Domain & {
  recipe: Recipe
  composing?: Composing
  context?: RecipeContext
  repository?: ImageRepository
}
