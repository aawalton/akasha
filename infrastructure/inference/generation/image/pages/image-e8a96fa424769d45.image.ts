import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE8a96fa424769d45 = {
  id: "01a0c5f3-9f6b-7f6b-8ff4-659b6653a4d3",
  type: "page-type/image",
  slug: "image-e8a96fa424769d45",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young fictional Korean kpop idol woman sitting cross-legged on a picnic blanket on a sunny grassy field, wearing a yellow bikini, candid mid-laugh, bright natural sunlight, 50mm portrait, shallow depth of field, fine skin and hair detail, photorealistic",
  seed: 487991361,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
