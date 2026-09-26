import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image34a78ddf4cab35d2 = {
  id: "01a0c5f4-03a3-76fa-b79f-e731bd4474b1",
  type: "page-type/image",
  slug: "image-34a78ddf4cab35d2",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid photo, two young Korean women mid-twenties slim kpop-idol builds standing in warm tropical rain, one closely spooning the other while standing, both facing forward toward the camera, the rear womans arms wrapped around the front womans midriff, her head tucked beside the front womans neck peeking out, both delighted smiles, the back woman largely hidden behind the front woman, drenched, wet lingerie, palm leaves, soft light, candid snapshot",
  seed: 1395354401,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
