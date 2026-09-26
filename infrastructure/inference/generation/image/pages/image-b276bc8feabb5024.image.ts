import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB276bc8feabb5024 = {
  id: "019f1839-3597-78df-a1e3-342947a6092b",
  type: "page-type/image",
  slug: "image-b276bc8feabb5024",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, standing in a sunlit wheat field at golden hour, wide cinematic landscape, environmental portrait, photo",
  seed: 1789428492,
  width: 1536,
  height: 640,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
