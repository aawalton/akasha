import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image74260ba1b73c6d43 = {
  id: "01a0c5f3-2541-710f-ae16-778dec7cd9f1",
  type: "page-type/image",
  slug: "image-74260ba1b73c6d43",
  persona: "persona/aine",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic photo of a slim Celtic woman in a sunlit wheat field, blazing red hair, green eyes, fair freckled skin, gentle confident smile, direct eye contact, wearing a richly ornate emerald and gold Gaelic ceremonial gown with intricate knotwork, a low sweetheart neckline, long sweeping floor-length skirt, long bell sleeves, warm golden hour light, 35mm full length, photorealistic",
  seed: 714,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
