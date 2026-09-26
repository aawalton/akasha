import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1159120635ed10c3 = {
  id: "01a0c5f2-eb24-7df5-85ec-e338db81da3b",
  type: "page-type/image",
  slug: "image-1159120635ed10c3",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman nude in a warm shower, water running over her shoulders and back, steam in the air, soft tender expression toward the viewer, soft diffused bathroom light, tasteful intimate framing, 50mm, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
