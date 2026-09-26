import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8503eba0497ae251 = {
  id: "01a0c5f2-eb24-7525-890d-3b560955a4d2",
  type: "page-type/image",
  slug: "image-8503eba0497ae251",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a delicate lace bralette and matching panties, standing in a sunlit bedroom, soft morning light through sheer curtains, relaxed warm gaze toward the viewer, 50mm, shallow depth of field, visible skin texture, fine lace detail, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
