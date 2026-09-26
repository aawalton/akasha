import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image44938e82ce4c28cb = {
  id: "01a0c5f3-f000-708d-99d7-1721a4291083",
  type: "page-type/image",
  slug: "image-44938e82ce4c28cb",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid photo of a young Korean woman in her mid-twenties, slim kpop-idol build, joyfully twirling in the rain in a sheer wet white nightgown clinging to her body, delighted laughing smile, water spraying off the hem, soft overcast light, lush garden, dynamic spontaneous candid snapshot",
  seed: 402185264,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
