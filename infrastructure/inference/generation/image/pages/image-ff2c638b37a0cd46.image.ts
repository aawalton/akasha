import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFf2c638b37a0cd46 = {
  id: "01a0c5f3-b3c8-701b-bf93-34a673e30147",
  type: "page-type/image",
  slug: "image-ff2c638b37a0cd46",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Florida personified as a beautiful young woman in her early twenties — sun-bronzed skin, dark hair with an orange blossom tucked in, flowing flamingo-pink dress, palm trees and turquoise ocean surf behind her, bright tropical golden-hour light, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 749632499,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
