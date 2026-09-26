import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB825d54b9f095bb2 = {
  id: "019f1839-09d8-70c8-90a5-cd40949d454a",
  type: "page-type/image",
  slug: "image-b825d54b9f095bb2",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic near-full-body intimate portrait of two young women lovers in a close standing embrace, bodies turned fully into each other, a breath apart gazing at each other's lips, bare shoulders and skin, one silver-blonde and one dark chestnut, warm golden light, the whole pose communicating their closeness, sensual and tender, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80410011,
  width: 896,
  height: 1152,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
