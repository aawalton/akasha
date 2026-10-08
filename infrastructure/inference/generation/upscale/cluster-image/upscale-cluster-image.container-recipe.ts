import type { ContainerRecipe } from "akasha/code/container-recipe/container-recipe.page-type.types.ts"

export const upscaleClusterImage = {
  id: "01a06815-9efd-703f-830c-ec7f071cf0a0",
  type: "page-type/container-recipe",
  slug: "upscale-cluster-image",
  definition: "the image an upscale benchmark runs from on a Pascal card",
  recipe: "dockerfile",
  repository: "cluster/upscale-cu121",
  createdAt: "2026-09-03T16:24:02.557Z",
  updatedAt: "2026-09-15T16:30:42.000Z",
} as const satisfies ContainerRecipe
