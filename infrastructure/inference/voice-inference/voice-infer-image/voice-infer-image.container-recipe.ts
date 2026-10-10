import type { ContainerRecipe } from "akasha/code/container-recipe/container-recipe.page-type.types.ts"

export const voiceInferImage = {
  id: "01a06815-9efd-701b-b692-88c2eabada02",
  type: "page-type/container-recipe",
  slug: "voice-infer-image",
  definition: "the image a voice service runs from on a Pascal card",
  recipe: "dockerfile",
  repository: "cluster/voice-infer-cu121",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every Python dependency is pinned to the version the last working image ran.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "torch, torchaudio and torchvision are left as the base image has them.",
    },
  ],
  createdAt: "2026-09-03T16:24:02.557Z",
  updatedAt: "2026-10-10T18:47:34.490Z",
} as const satisfies ContainerRecipe
