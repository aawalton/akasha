import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF1a44149de7f229f = {
  id: "01a0c5f2-eb1f-7932-ba25-fe0dfb9d051e",
  type: "page-type/image",
  slug: "image-f1a44149de7f229f",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman on a carnival date, casual denim jacket and tee, ferris wheel and string lights glowing behind her, joyful excited smile, warm evening light, 35mm, candid, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
