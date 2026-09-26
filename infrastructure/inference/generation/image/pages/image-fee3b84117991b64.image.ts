import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFee3b84117991b64 = {
  id: "01a0c5f3-b3c9-7252-8247-f6c404377b34",
  type: "page-type/image",
  slug: "image-fee3b84117991b64",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "South Carolina personified as a beautiful young woman in her early twenties — golden-brown skin, soft curls with yellow jessamine woven in, pastel Charleston-style dress, palmetto trees and pastel row houses with wrought-iron balconies behind her, warm honeyed lowcountry light, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 610295748,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
