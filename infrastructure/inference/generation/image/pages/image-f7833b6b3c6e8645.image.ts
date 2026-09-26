import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF7833b6b3c6e8645 = {
  id: "01a0c5f4-03a3-7899-b863-4c6b9b1871bd",
  type: "page-type/image",
  slug: "image-f7833b6b3c6e8645",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "two nude adult women lying together on a bed, intimate bedroom scene, photorealistic, 50mm photo, soft natural window light, visible skin texture, relaxed natural poses, shallow depth of field",
  seed: 1378275299,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
