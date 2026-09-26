import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE68b89cac59f23ac = {
  id: "01a0c5f2-eb24-7635-a57f-1f38814f2ff5",
  type: "page-type/image",
  slug: "image-e68b89cac59f23ac",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman lying in bed scrolling her phone, relaxed on her side, soft lamplight, comfortable home clothes, peaceful unguarded expression, 50mm, shallow depth of field, warm tones, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
