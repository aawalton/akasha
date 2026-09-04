import type { ContainerRecipe } from "@akasha/code-system/container-recipe"

export const voiceInferImage = {
  id: "01a06815-9efd-701b-b692-88c2eabada02",
  pageTypeSlug: "container-recipe",
  slug: "voice-infer-image",
  definition: "the image a voice service runs from on a Pascal card",
  recipe: "dockerfile",
} as const satisfies ContainerRecipe
