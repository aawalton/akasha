import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3556a7eaccbee2c8 = {
  id: "01a0c5f3-b3c8-79d7-b0c0-7cafe54a1b92",
  type: "page-type/image",
  slug: "image-3556a7eaccbee2c8",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Massachusetts personified as a beautiful young woman in her early twenties — dark hair in a windblown bob, camel wool coat and crimson scarf, mayflower blossoms pinned at her collar, Boston brick row houses and autumn maples behind her, crisp New England fall light, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 1634392836,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
