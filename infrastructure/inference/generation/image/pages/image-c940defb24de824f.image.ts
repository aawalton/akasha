import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC940defb24de824f = {
  id: "01a0c5f3-2541-7a95-bfb7-8d7df8be6e04",
  type: "page-type/image",
  slug: "image-c940defb24de824f",
  persona: "persona/aine",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic photo of a slim Celtic woman in a summer meadow at golden hour, glancing back over her shoulder at the camera with direct eye contact and a warm smile, blazing red hair swept to one side, green eyes, fair freckled skin, wearing an ornate deep-green Gaelic gown with an open low-cut back showing her bare back, gold knotwork embroidery, long floor-length hem trailing, long sleeves, warm sunlight, 35mm full length, photorealistic",
  seed: 712,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
