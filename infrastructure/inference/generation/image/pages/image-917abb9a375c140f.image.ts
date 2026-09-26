import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image917abb9a375c140f = {
  id: "01a0c5f3-b3c8-70b5-81a0-be7e5e16c96f",
  type: "page-type/image",
  slug: "image-917abb9a375c140f",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Hawaii personified as a beautiful young woman in her early twenties — Polynesian features, long black hair with a red hibiscus behind her ear, white plumeria lei over a tropical print dress, volcanic black-rock coastline and turquoise Pacific surf behind her, radiant island sunlight, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 691184771,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
