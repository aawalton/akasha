import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB38e02fddf4140e3 = {
  id: "019f5827-5e32-72a2-8e29-e7983da69447",
  type: "page-type/image",
  slug: "image-b38e02fddf4140e3",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "beautiful flirtatious young woman bartender, long wavy hair, fitted vest over a white shirt with rolled sleeves, shaking a cocktail mid-toss, eyebrow raised and playful smile, speakeasy backbar glow, photorealistic photograph, natural skin texture, film grain",
  seed: 1728438016,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
