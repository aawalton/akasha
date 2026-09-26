import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDc3dde45954643ea = {
  id: "01a0c5f3-9f6e-7c36-baef-52a2553e5fa3",
  type: "page-type/image",
  slug: "image-dc3dde45954643ea",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid travel snapshot of a young Korean woman in her mid-twenties with a slim petite kpop-idol build, standing under a jungle waterfall, drenched, wet lingerie, delighted laughing smile, water splashing around her, natural daylight, authentic handheld travel photo, slightly imperfect candid framing, lush green rainforest",
  seed: 2027823277,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
