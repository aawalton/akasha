import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEddf3d6a329b613b = {
  id: "01a0c5f2-eb21-7b92-8d37-e7e71305b5b1",
  type: "page-type/image",
  slug: "image-eddf3d6a329b613b",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman travelling in Rome standing in front of the Colosseum, casual summer outfit, sunglasses pushed up on her head, warm afternoon light, natural relaxed pose, cheerful smile toward the viewer, 35mm, candid travel photo, visible skin texture, photoreal",
  seed: 88,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
