import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB4776fa6c0c523a6 = {
  id: "01a0c5f2-eb20-7769-b45e-f2ce926a2b08",
  type: "page-type/image",
  slug: "image-b4776fa6c0c523a6",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a snowy pine forest, cozy winter coat and knit hat, breath visible in cold air, bright soft snow light, cheerful rosy-cheeked smile, 35mm, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
