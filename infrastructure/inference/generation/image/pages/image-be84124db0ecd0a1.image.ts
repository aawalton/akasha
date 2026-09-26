import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBe84124db0ecd0a1 = {
  id: "01a0c5f3-b3c8-7d73-b069-7b0d524ebb6c",
  type: "page-type/image",
  slug: "image-be84124db0ecd0a1",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Illinois personified as a beautiful young woman in her early twenties — dark blonde hair blowing in prairie wind, smart city trench coat over a violet-blue dress, tallgrass prairie in the foreground with a distant Chicago skyline on the horizon, dramatic midwestern golden hour, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 1202981728,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
