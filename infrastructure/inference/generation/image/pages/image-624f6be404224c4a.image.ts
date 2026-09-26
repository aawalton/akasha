import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image624f6be404224c4a = {
  id: "01a0c5f2-eb25-7acb-9c4f-a80cdce816db",
  type: "page-type/image",
  slug: "image-624f6be404224c4a",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a lace teddy walking down a sunlit hallway, glancing back over her shoulder with a soft smile, warm light, 35mm, shallow depth of field, fine lace detail, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
