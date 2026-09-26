import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image74d9ad1c2fcce219 = {
  id: "01a0c5f3-b3c9-770d-957e-670add4e54ab",
  type: "page-type/image",
  slug: "image-74d9ad1c2fcce219",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "New Mexico personified as a beautiful young woman in her early twenties — long black hair, turquoise-and-silver squash blossom necklace over an earth-toned dress, adobe walls with chile ristras and colorful hot air balloons rising over desert mesas behind her, luminous high-desert morning light, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 537595089,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
