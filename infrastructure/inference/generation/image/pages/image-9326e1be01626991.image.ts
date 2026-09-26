import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9326e1be01626991 = {
  id: "01a0c5f2-eb25-7108-a4a6-e33f11a95296",
  type: "page-type/image",
  slug: "image-9326e1be01626991",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a lace bodysuit leaning against the bedroom wall, one hand in her hair, soft warm light, alluring relaxed expression toward the viewer, 50mm, shallow depth of field, fine lace detail, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
