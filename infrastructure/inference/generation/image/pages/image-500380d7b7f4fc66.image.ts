import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image500380d7b7f4fc66 = {
  id: "01a0c5f3-b3c9-7a3a-83a8-7e0fcea28747",
  type: "page-type/image",
  slug: "image-500380d7b7f4fc66",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "deadpan woman in an oversized hoodie off one shoulder and tube socks sitting atop a washer popping bubblegum, midnight laundromat fluorescence, photorealistic photograph, natural skin texture, film grain",
  seed: 1045217265,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
