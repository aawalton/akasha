import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDbb9d703b51b90af = {
  id: "01a0c5f3-9f6b-7314-9b5e-312b43b7b770",
  type: "page-type/image",
  slug: "image-dbb9d703b51b90af",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "dreamlike woman in layered sheer organza in sunset gradient colors, arms lifted as fabric billows, wind-blown studio glow, photorealistic photograph, natural skin texture, film grain",
  seed: 864285351,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
