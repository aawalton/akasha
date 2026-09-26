import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5666360a905bbc6c = {
  id: "01a0c5f2-eb1f-7262-966f-65a5d00dfafc",
  type: "page-type/image",
  slug: "image-5666360a905bbc6c",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman hiking on a mountain ridge, backpack and athletic outdoor gear, looking out over a vast valley, wind in her hair, bright crisp daylight, epic landscape, 35mm, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
