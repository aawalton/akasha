import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB13beefb6158b72b = {
  id: "01a0c5f3-9f6a-7e3c-8c4d-368e98e74085",
  type: "page-type/image",
  slug: "image-b13beefb6158b72b",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman on a boat off Ibiza in a soaked white shirt clinging translucent to her bare skin, unbuttoned low, salt water dripping, laughing sun, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1130089029,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
