import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4c9c67c9755d3b3d = {
  id: "01a0c5f3-b3c8-7641-8492-055b77b5d16a",
  type: "page-type/image",
  slug: "image-4c9c67c9755d3b3d",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Maine personified as a beautiful young woman in her early twenties — auburn hair windblown, cream cable-knit fisherman sweater, standing on rocky granite coast with a white lighthouse and pine forest behind her, cold clear Atlantic morning light, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 1936384841,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
