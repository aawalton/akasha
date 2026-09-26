import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image816bb8832daaf4af = {
  id: "01a0c5f3-b3c8-7acc-a992-0fe01db35f05",
  type: "page-type/image",
  slug: "image-816bb8832daaf4af",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Louisiana personified as a beautiful young woman in her early twenties — warm brown skin, dark curls pinned with a magnolia blossom, deep green satin dress with gold fleur-de-lis embroidery, standing on a bayou boardwalk with cypress trees and hanging spanish moss, fireflies in humid dusk air, photorealistic portrait, three-quarter view, sultry golden dusk light",
  seed: 2057718659,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
