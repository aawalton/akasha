import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2c84053a6c491907 = {
  id: "01a0c5f2-eb24-70cc-aa8c-3a45f4dddad8",
  type: "page-type/image",
  slug: "image-2c84053a6c491907",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a loosely open silk robe over a lace bra and panties, standing in the bedroom doorway, soft inviting smile, warm hallway light, 35mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
