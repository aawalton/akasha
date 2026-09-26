import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2f9ae6d0a6f43498 = {
  id: "01a0c5f3-2541-70a9-8e1b-d1bf965ce22b",
  type: "page-type/image",
  slug: "image-2f9ae6d0a6f43498",
  persona: "persona/aine",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic photo of a slim Celtic woman turned three-quarters in a summer field at golden hour, showing both the low neckline and open back of her gown, head turned to the camera with a warm radiant smile and direct eye contact, blazing red hair, green eyes, fair freckled skin, ornate green Gaelic gown with gold embroidery, low front and low open back, long floor-length hem, long sleeves, warm light, 35mm full length, photorealistic",
  seed: 715,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
