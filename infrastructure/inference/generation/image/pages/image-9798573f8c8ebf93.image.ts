import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9798573f8c8ebf93 = {
  id: "01a0c5f3-c686-7e68-b958-3045c05e1d04",
  type: "page-type/image",
  slug: "image-9798573f8c8ebf93",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid travel photo of a young Korean woman in her mid-twenties, slim kpop-idol build, standing waist-deep where a waterfall meets the pool, joyfully splashing water with both hands, delighted laughing smile, drenched, wet lingerie, dynamic spontaneous moment, handheld snapshot, natural daylight",
  seed: 1533892438,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
