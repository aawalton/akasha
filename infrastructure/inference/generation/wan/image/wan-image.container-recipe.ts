import type { ContainerRecipe } from "akasha/code/container-recipe/container-recipe.page-type.types.ts"

export const wanImage = {
  id: "01a06815-9efd-7027-9ba4-a87237aa9261",
  type: "page-type/container-recipe",
  slug: "wan-image",
  definition: "the image Wan runs ComfyUI from on a Blackwell card",
  recipe: "dockerfile",
  createdAt: "2026-09-03T16:24:02.557Z",
  updatedAt: "2026-09-15T16:30:42.000Z",
} as const satisfies ContainerRecipe
