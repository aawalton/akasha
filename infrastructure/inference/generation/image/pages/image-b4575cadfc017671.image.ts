import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB4575cadfc017671 = {
  id: "01a0c5f3-c686-7158-b0e7-59264afab1a4",
  type: "page-type/image",
  slug: "image-b4575cadfc017671",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid travel photo of a young Korean woman in her mid-twenties, slim kpop-idol build, standing under a waterfall with her head tilted up into the water, delighted open grin, drenched, wet lingerie, sun flare through the mist, authentic handheld snapshot, lush jungle, natural light",
  seed: 900223496,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
