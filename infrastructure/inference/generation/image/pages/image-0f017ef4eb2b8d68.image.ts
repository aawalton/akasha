import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0f017ef4eb2b8d68 = {
  id: "01a0c5f4-03a3-79de-a32a-1321605da770",
  type: "page-type/image",
  slug: "image-0f017ef4eb2b8d68",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "two nude adult women on a bed, one lying on top of the other, facing each other, intimate bedroom scene, photorealistic, 50mm photo, soft natural window light, visible skin texture, shallow depth of field",
  seed: 981187597,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
