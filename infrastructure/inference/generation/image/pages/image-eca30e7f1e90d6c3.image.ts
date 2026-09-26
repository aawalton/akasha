import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEca30e7f1e90d6c3 = {
  id: "01a0c5f2-eb25-7442-88aa-03fde81c0566",
  type: "page-type/image",
  slug: "image-eca30e7f1e90d6c3",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, leaning against a kitchen counter in the morning, wearing a grey cotton bra and panties, casual relaxed posture, soft daylight, 85mm portrait, photoreal",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
