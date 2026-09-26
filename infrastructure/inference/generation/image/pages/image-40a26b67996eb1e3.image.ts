import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image40a26b67996eb1e3 = {
  id: "01a0c5f3-f002-7d24-a8b4-474a21fa2965",
  type: "page-type/image",
  slug: "image-40a26b67996eb1e3",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a nude adult Korean woman lying on a bed, one hand with fingers in her vagina, her other hand massaging one breast, head tipped back, eyes closed, mouth open in a moan, closer framing, intimate bedroom scene, photorealistic, 35mm photo, soft natural window light, visible skin texture, shallow depth of field",
  seed: 96787362,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
