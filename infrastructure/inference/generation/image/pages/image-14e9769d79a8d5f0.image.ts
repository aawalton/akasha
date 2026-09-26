import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image14e9769d79a8d5f0 = {
  id: "01a0c5f2-eb24-7981-9501-765b50b09209",
  type: "page-type/image",
  slug: "image-14e9769d79a8d5f0",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman putting on an earring at a vanity mirror, getting ready, soft focused expression, warm dressing-room light, 50mm, visible skin texture, intimate everyday, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
