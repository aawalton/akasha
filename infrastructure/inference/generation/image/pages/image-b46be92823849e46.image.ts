import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB46be92823849e46 = {
  id: "01a0c5f2-eb24-7480-a564-ec34e754249d",
  type: "page-type/image",
  slug: "image-b46be92823849e46",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cuddled under a blanket by a rain-streaked window, looking softly at the viewer, gray overcast light, cozy warm interior, 50mm, shallow depth of field, soft mood, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
