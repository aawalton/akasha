import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image117f62c9c156d4b1 = {
  id: "01a0c5f3-7a9b-7356-891e-5d78e1f74804",
  type: "page-type/image",
  slug: "image-117f62c9c156d4b1",
  grade: "A+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "east asian woman in an emerald lace lingerie set stretching her arms overhead by a floor mirror, eyes closed and serene, golden-hour bedroom, photorealistic photograph, natural skin texture, film grain",
  seed: 256176388,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
