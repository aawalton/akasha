import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image430c68f72a00e6a5 = {
  id: "01a0c5f2-eb21-75e0-9953-b78c8ba58936",
  type: "page-type/image",
  slug: "image-430c68f72a00e6a5",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman at a scenic Swiss alpine train stop, casual outdoor layers, snow-capped peaks behind, crisp bright light, awed happy expression, 35mm, travel photo, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
