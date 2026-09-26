import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE46404ca4958ed78 = {
  id: "01a0c5f3-b3c9-7c1f-81f8-6d711ff7edf2",
  type: "page-type/image",
  slug: "image-e46404ca4958ed78",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "New Hampshire personified as a beautiful young woman in her early twenties — dark blonde hair loose under a knit beanie, granite-gray wool coat, purple lilacs in hand, the White Mountains in full autumn blaze and a granite ledge behind her, sharp clean mountain air light, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 200540121,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
