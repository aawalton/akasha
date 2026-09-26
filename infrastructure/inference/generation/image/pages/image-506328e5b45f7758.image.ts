import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image506328e5b45f7758 = {
  id: "01a0c5f2-eb24-7b45-aa8a-751c7c4685b2",
  type: "page-type/image",
  slug: "image-506328e5b45f7758",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a satin slip dress in the morning kitchen, holding a coffee mug, leaning on the counter, soft warm light, relaxed playful smile, 35mm, fine fabric sheen, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
