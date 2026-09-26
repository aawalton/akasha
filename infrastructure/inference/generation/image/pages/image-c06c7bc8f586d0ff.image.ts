import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC06c7bc8f586d0ff = {
  id: "01a0c5f3-7a9b-76b1-ba94-5ce133a9450c",
  type: "page-type/image",
  slug: "image-c06c7bc8f586d0ff",
  grade: "A+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "sleepy-eyed woman in a bias-cut champagne slip, stretching by a tall window with a soft morning smile, Parisian apartment, dawn light, photorealistic photograph, natural skin texture, film grain",
  seed: 1946984367,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
