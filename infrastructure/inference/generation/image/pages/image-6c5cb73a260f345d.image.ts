import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6c5cb73a260f345d = {
  id: "01a0c5f2-eb1f-7fee-99ac-7e82ba559f44",
  type: "page-type/image",
  slug: "image-6c5cb73a260f345d",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman on a casual rooftop dinner date, simple knit top and jeans, string lights and city glow behind her, warm relaxed smile, soft evening light, 50mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
