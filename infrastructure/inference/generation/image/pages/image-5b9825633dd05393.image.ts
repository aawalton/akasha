import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5b9825633dd05393 = {
  id: "01a0c5f3-b3c9-79c3-b011-5d130a028962",
  type: "page-type/image",
  slug: "image-5b9825633dd05393",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "North Dakota personified as a beautiful young woman in her early twenties — light blonde hair braided, prairie work dress with a wild prairie rose in hand, painted badlands buttes and open northern plains behind her, stark beautiful golden-plains light, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 813066307,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
