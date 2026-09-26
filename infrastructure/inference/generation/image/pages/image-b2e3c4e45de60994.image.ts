import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB2e3c4e45de60994 = {
  id: "01a0c5f3-f003-7d02-8036-5a29566b345e",
  type: "page-type/image",
  slug: "image-b2e3c4e45de60994",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a nude adult Korean woman lying on a bed, one hand with fingers in her vagina, her other hand massaging one breast, head tipped back, eyes closed, mouth open in a moan, closer framing, intimate bedroom scene, photorealistic, 35mm photo, soft natural window light, visible skin texture, shallow depth of field",
  seed: 633771283,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
