import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image815a73860028bd86 = {
  id: "01a0c5f2-eb20-7631-97a7-07dc735d444a",
  type: "page-type/image",
  slug: "image-815a73860028bd86",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a bright sunflower field, casual summer dress, warm sunny light, radiant happy smile toward the viewer, 50mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
