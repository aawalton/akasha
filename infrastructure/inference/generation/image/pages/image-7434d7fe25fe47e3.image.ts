import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7434d7fe25fe47e3 = {
  id: "01a0c5f3-b3c9-7897-a49a-b4c7d9cab656",
  type: "page-type/image",
  slug: "image-7434d7fe25fe47e3",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Rhode Island personified as a beautiful young woman in her early twenties — windswept light brown hair, navy-striped breton top and white sailing jacket, violets pinned at her collar, Newport cliff walk with sailboats and a grand seaside mansion behind her, bright crisp sailing-day light, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 1405185325,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
