import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB39c4bd3ed5dbf9d = {
  id: "01a0c5f3-b3c9-7020-9836-b349bd03d869",
  type: "page-type/image",
  slug: "image-b39c4bd3ed5dbf9d",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "New Jersey personified as a beautiful young woman in her early twenties — dark wavy hair, retro boardwalk style with a violet tucked behind her ear, classic wooden boardwalk with a ferris wheel and Atlantic surf behind her, nostalgic seaside golden hour, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 230789742,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
