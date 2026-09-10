import type { ContainerRecipe } from "akasha/code-system/container-recipes/container-recipe.page-type.types.ts"

export const wanImage = {
  id: "01a06815-9efd-7027-9ba4-a87237aa9261",
  pageTypeSlug: "container-recipe",
  type: "container-recipe",
  slug: "wan-image",
  definition: "the image Wan runs ComfyUI from on a Blackwell card",
  recipe: "dockerfile",
} as const satisfies ContainerRecipe
