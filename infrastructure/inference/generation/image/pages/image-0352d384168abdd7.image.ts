import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0352d384168abdd7 = {
  id: "01a0c5f2-eb20-7ddd-b3e2-530699add0cd",
  type: "page-type/image",
  slug: "image-0352d384168abdd7",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman on a grassy hilltop above a sea of morning mist, casual jacket, soft pastel dawn light, peaceful contemplative expression, 35mm, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
