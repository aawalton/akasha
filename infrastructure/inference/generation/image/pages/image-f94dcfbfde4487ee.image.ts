import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF94dcfbfde4487ee = {
  id: "01a0c5f4-03a3-7592-bb85-18c122afa27a",
  type: "page-type/image",
  slug: "image-f94dcfbfde4487ee",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "two nude adult women on a bed, one lying on top of the other, facing each other, intimate bedroom scene, photorealistic, 50mm photo, soft natural window light, visible skin texture, shallow depth of field",
  seed: 1781731713,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
