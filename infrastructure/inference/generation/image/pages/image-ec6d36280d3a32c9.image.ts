import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEc6d36280d3a32c9 = {
  id: "01a0c5f3-b3c8-79c7-b7cf-1b7ee580cd24",
  type: "page-type/image",
  slug: "image-ec6d36280d3a32c9",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Iowa personified as a beautiful young woman in her early twenties — golden-blonde hair in soft waves, denim overalls over a white blouse, wild prairie roses in her hand, endless tasseled cornfields under a huge summer sky behind her, warm harvest evening light, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 1019580576,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
