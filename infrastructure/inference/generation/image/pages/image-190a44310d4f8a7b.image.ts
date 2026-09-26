import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image190a44310d4f8a7b = {
  id: "01a0c5f2-eb1f-7260-9fe4-02d6eb1a1dd3",
  type: "page-type/image",
  slug: "image-190a44310d4f8a7b",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman jogging along a city waterfront at dawn, athletic wear, ponytail swinging, healthy glow, cool morning light, dynamic candid, 35mm, shallow depth of field, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
