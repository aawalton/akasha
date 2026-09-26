import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFf7ad4582ccd6fb1 = {
  id: "019f57fb-8537-7105-9632-6f70bf0ac736",
  type: "page-type/image",
  slug: "image-ff7ad4582ccd6fb1",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "radiant south asian woman in a jewel-toned silk sari with bare midriff and gold bangles, spinning with her dupatta trailing, marigold market, photorealistic photograph, natural skin texture, film grain",
  seed: 505293981,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
