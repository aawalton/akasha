import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBdd6c8a411bde164 = {
  id: "019f581b-5477-7dbe-af2f-920fd3bca544",
  type: "page-type/image",
  slug: "image-bdd6c8a411bde164",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "laugh-crying woman in smudged glamour makeup and a slip sitting on a hotel bathroom floor with champagne, harsh vanity bulbs, editorial beautiful mess, photorealistic photograph, natural skin texture, film grain",
  seed: 1060088488,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
