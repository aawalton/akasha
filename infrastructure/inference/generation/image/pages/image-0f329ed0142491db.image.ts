import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0f329ed0142491db = {
  id: "01a0c5f3-9f6d-7c90-a9a5-322e4871824b",
  type: "page-type/image",
  slug: "image-0f329ed0142491db",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Arkansas personified as a beautiful young woman in her early twenties — auburn hair loose over a soft flannel and denim, a small raw diamond pendant at her throat, misty Ozark mountain forest and a clear spring-fed stream behind her, apple blossoms in her hair, soft morning fog light, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 438799642,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
