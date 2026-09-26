import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC50f43f5850cabf3 = {
  id: "01a0c5f2-eb21-70a0-88d8-b4a55e8aefad",
  type: "page-type/image",
  slug: "image-c50f43f5850cabf3",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in New York Times Square at night, casual jacket and jeans, neon billboards glowing around her, excited smile toward the viewer, vibrant city light, 35mm, candid travel photo, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
