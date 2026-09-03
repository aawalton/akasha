import type { ContainerRecipe } from "@akasha/code-system/container-recipe"

export const upscaleImage = {
  id: "01a06815-9efd-703e-b4a6-f5afa5889e2b",
  pageTypeSlug: "container-recipe",
  slug: "upscale-image",
  definition: "the image the upscaler runs ComfyUI from on a Blackwell card",
  recipe: "dockerfile",
} as const satisfies ContainerRecipe
