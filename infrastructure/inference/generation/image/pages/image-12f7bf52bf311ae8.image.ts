import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image12f7bf52bf311ae8 = {
  id: "01a0c5f3-9f6e-78cd-ac14-a99e1da23cd8",
  type: "page-type/image",
  slug: "image-12f7bf52bf311ae8",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "cute anime girl with wavy teal hair and warm ruby eyes, playful wink, wearing summer sundress and straw hat, at autumn park with falling leaves, vibrant saturated colors, detailed anime illustration, cel shading, clean line art, vibrant key visual style",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
