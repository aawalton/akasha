import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7cfbca64af118950 = {
  id: "01a0c5f2-eb1e-7adb-9ec3-bd164977213a",
  type: "page-type/image",
  slug: "image-7cfbca64af118950",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a tailored pencil skirt and blouse in a modern office, professional confident posture, soft daylight, composed smile, 50mm, fine fabric detail, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
