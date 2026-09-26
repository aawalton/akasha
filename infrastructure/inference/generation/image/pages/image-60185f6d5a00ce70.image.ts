import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image60185f6d5a00ce70 = {
  id: "01a0c5f2-eb23-75f4-a860-98988f1300aa",
  type: "page-type/image",
  slug: "image-60185f6d5a00ce70",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying a fantasy warrior princess, ornate golden armor and flowing cape, royal palace hall, regal confident expression, warm dramatic light, 35mm, detailed costume, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
