import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3c3cc6236785519c = {
  id: "01a0c5f3-b3c9-7f8e-879e-2303da038a92",
  type: "page-type/image",
  slug: "image-3c3cc6236785519c",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "New York personified as a beautiful young woman in her early twenties — sleek dark hair, tailored black coat with a red rose in hand, standing in golden evening light with the Manhattan skyline and Brooklyn Bridge glowing behind her, cinematic city dusk, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 1794276711,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
