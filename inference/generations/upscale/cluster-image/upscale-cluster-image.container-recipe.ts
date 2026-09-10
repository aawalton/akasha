import type { ContainerRecipe } from "akasha/code-system/container-recipes/container-recipe.page-type.types.ts"

export const upscaleClusterImage = {
  id: "01a06815-9efd-703f-830c-ec7f071cf0a0",
  pageTypeSlug: "container-recipe",
  type: "container-recipe",
  slug: "upscale-cluster-image",
  definition: "the image an upscale benchmark runs from on a Pascal card",
  recipe: "dockerfile",
} as const satisfies ContainerRecipe
