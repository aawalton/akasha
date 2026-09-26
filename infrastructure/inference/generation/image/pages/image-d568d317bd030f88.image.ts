import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD568d317bd030f88 = {
  id: "019f57eb-ce97-7724-8ace-c450fecbdaaa",
  type: "page-type/image",
  slug: "image-d568d317bd030f88",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "determined woman in a climbing tank with chalked hands hanging one-armed from a crag, gritted smile, canyon sunset, photorealistic photograph, natural skin texture, film grain",
  seed: 1368517819,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
