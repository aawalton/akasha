import type { ContainerRecipe } from "akasha/code/container-recipe/container-recipe.page-type.types.ts"

export const voiceInferImage = {
  id: "01a06815-9efd-701b-b692-88c2eabada02",
  type: "page-type/container-recipe",
  slug: "voice-infer-image",
  definition: "the image a voice service runs from on a Pascal card",
  recipe: "dockerfile",
  repository: "cluster/voice-infer-cu121",
  createdAt: "2026-09-03T16:24:02.557Z",
  updatedAt: "2026-09-15T16:30:42.000Z",
} as const satisfies ContainerRecipe
