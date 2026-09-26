import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDb60455dfda03e23 = {
  id: "01a0c5f3-efff-76c0-bc9b-b2c4fc103848",
  type: "page-type/image",
  slug: "image-db60455dfda03e23",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a beautiful nude blonde woman on her back in rumpled sheets, spine arched off the bed, head turned to the side with lips parted, a man's hand between her spread bare thighs, her fist twisted white-knuckled in the linen, fair skin flushed rose from chest to cheeks, full breasts, warm low firelight, photorealistic, shallow depth of field, visible skin texture",
  seed: 71419694,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
