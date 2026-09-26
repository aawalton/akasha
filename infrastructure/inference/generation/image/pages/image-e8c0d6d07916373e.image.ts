import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE8c0d6d07916373e = {
  id: "01a0c5f3-b3c9-795c-8167-947674e1dd3a",
  type: "page-type/image",
  slug: "image-e8c0d6d07916373e",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Beautiful Afro-Cuban woman on a Havana balcony at dusk in 1954, sheer coral chiffon dress lit through by the last low sun, standing with one hand on the wrought iron rail and the other on her hip, warm brown skin, big natural curls, looking straight at the viewer with a slow smile, peeling pastel walls and old cars below, painterly realism, golden hour\n",
  seed: 1905637718,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
