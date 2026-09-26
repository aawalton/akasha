import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image95698132755abf44 = {
  id: "019f579c-b697-7ec6-bcba-f47138d7257d",
  type: "page-type/image",
  slug: "image-95698132755abf44",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Alaska personified as a beautiful young woman in her early twenties — dark hair dusted with snowflakes under a white fur-trimmed parka hood, standing on a frozen tundra plain beneath green and violet aurora borealis, snow-capped mountains behind her, realistic pale skin with cold-flushed cheeks, night photography lit by aurora glow, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 801221437,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
