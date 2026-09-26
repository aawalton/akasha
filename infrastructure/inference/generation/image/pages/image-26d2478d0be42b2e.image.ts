import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image26d2478d0be42b2e = {
  id: "01a0c5f3-9f6e-7b49-883b-1aaeeee424a9",
  type: "page-type/image",
  slug: "image-26d2478d0be42b2e",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "cute anime girl with mint-green side braid and warm ruby eyes, playful wink, wearing witch hat and starry cloak, at futuristic train interior, cool blue-violet palette, detailed anime illustration, cel shading, clean line art, vibrant key visual style",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
