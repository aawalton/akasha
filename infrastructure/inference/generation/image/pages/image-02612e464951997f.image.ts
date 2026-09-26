import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image02612e464951997f = {
  id: "01a0c5f2-eb20-78d5-99e4-5361c0cc5ebf",
  type: "page-type/image",
  slug: "image-02612e464951997f",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a tall grass meadow at golden hour, casual linen outfit, backlit glowing rim light, soft joyful smile toward the viewer, 35mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
