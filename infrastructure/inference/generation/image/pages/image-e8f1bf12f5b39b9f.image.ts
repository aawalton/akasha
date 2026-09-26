import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE8f1bf12f5b39b9f = {
  id: "01a0c5f3-b3c9-79e4-8707-c7d4c7e40911",
  type: "page-type/image",
  slug: "image-e8f1bf12f5b39b9f",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young fictional Korean kpop idol woman sitting cross-legged on a picnic blanket on a sunny grassy field, wearing a sheer yellow lace shirt over a bikini bottom, candid mid-laugh, bright natural sunlight, 50mm portrait, shallow depth of field, fine skin and hair detail, photorealistic",
  seed: 1053573555,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
