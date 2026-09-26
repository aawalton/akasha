import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAed67a01affd1bce = {
  id: "01a0c5f3-b3c8-78ad-a1b9-d440704cfe52",
  type: "page-type/image",
  slug: "image-aed67a01affd1bce",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "smirking woman in a white sailor crop top and high-waisted shorts giving a mock salute, breezy harbor deck, photorealistic photograph, natural skin texture, film grain",
  seed: 1026654629,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
