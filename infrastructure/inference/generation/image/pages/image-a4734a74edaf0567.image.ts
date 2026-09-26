import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA4734a74edaf0567 = {
  id: "019f1836-d700-7f97-a6c4-44f82a4145d0",
  type: "page-type/image",
  slug: "image-a4734a74edaf0567",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying anime gothic lolita fashion, elaborate black-and-lace ruffled dress, parasol, ornate Victorian backdrop, elegant cool expression, soft moody light, 50mm, detailed costume, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
