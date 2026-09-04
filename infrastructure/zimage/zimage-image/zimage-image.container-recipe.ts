import type { ContainerRecipe } from "@akasha/code-system/container-recipe"

export const zimageImage = {
  id: "01a06815-9efd-7031-a984-cc177378d515",
  pageTypeSlug: "container-recipe",
  slug: "zimage-image",
  definition: "the image Z-Image runs ComfyUI from on a Blackwell card",
  recipe: "dockerfile",
} as const satisfies ContainerRecipe
