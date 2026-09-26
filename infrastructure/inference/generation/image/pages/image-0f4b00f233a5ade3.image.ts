import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0f4b00f233a5ade3 = {
  id: "019f1836-d7c0-7c2d-8a7a-9fc3720daa3c",
  type: "page-type/image",
  slug: "image-0f4b00f233a5ade3",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a deep red and gold autumn kimono at a traditional temple courtyard with maple leaves, warm late-afternoon light, graceful poised expression, 50mm, fine fabric detail, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
