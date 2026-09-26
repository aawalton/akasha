import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA4469b85e019b6b9 = {
  id: "01a0c5f2-eb24-7d38-8f05-b34a71b25b8d",
  type: "page-type/image",
  slug: "image-a4469b85e019b6b9",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman wrapped in a soft towel after a shower, damp hair, gentle smile toward the viewer, warm steamy bathroom, soft diffused light, 50mm, visible skin texture, tasteful and tender, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
