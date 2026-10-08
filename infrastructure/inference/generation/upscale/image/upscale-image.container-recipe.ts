import type { ContainerRecipe } from "akasha/code/container-recipe/container-recipe.page-type.types.ts"

export const upscaleImage = {
  id: "01a06815-9efd-703e-b4a6-f5afa5889e2b",
  type: "page-type/container-recipe",
  slug: "upscale-image",
  definition: "the image the upscaler runs ComfyUI from on a Blackwell card",
  recipe: "dockerfile",
  createdAt: "2026-09-03T16:24:02.557Z",
  updatedAt: "2026-09-15T16:30:42.000Z",
} as const satisfies ContainerRecipe
