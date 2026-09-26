import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8de5f66a5811c995 = {
  id: "01a0c5f3-9f6f-7c96-ada9-82088fb7db93",
  type: "page-type/image",
  slug: "image-8de5f66a5811c995",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "whooping skater girl in a cropped tee and baggy jeans mid-kickflip, skatepark at sunset, photorealistic photograph, natural skin texture, film grain",
  seed: 2143561292,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
