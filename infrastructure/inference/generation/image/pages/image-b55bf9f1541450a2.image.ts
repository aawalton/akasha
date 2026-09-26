import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB55bf9f1541450a2 = {
  id: "01a0c5f3-b3cb-7c6a-b524-cf78c371759a",
  type: "page-type/image",
  slug: "image-b55bf9f1541450a2",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "three young women relaxing together in a steamy traditional public bathhouse, soft natural light filtering through rising steam, warm stone pool with clear hot water, wrapped in white towels, serene candid expressions, shoulders above the waterline, atmospheric mist, 35mm film photograph, soft diffused lighting, visible skin texture, photorealistic, cinematic ambiance",
  seed: 11,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
