import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2dc1230ce8635d2b = {
  id: "01a0c5f2-eb22-7aca-9a58-8b13b39edea7",
  type: "page-type/image",
  slug: "image-2dc1230ce8635d2b",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in tight black yoga pants and a loose draped off-shoulder top, standing in a sunlit kitchen holding a coffee mug, relaxed warm smile toward the viewer, soft morning light, fine fabric detail, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
