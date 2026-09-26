import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD01f82292271c184 = {
  id: "01a0c5f3-efff-7ae8-a54d-502d9833ca14",
  type: "page-type/image",
  slug: "image-d01f82292271c184",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "view from behind of a beautiful nude blonde woman straddling and riding, her bare back arched deeply, loose golden hair spilling down her spine, the full flare of her hips and rounded bottom mid-rock, fair skin in dim warm ember light, rumpled white linen around her knees, photorealistic, shallow depth of field, visible skin texture",
  seed: 1028650529,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
