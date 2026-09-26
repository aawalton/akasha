import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD06cf88b35cdffcd = {
  id: "019f1836-da10-7d9c-8a3f-cddcd509c823",
  type: "page-type/image",
  slug: "image-d06cf88b35cdffcd",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying an anime-style school uniform, pleated skirt and blazer, ribbon tie, bright classroom, cheerful smile, soft natural light, 50mm, detailed costume, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
