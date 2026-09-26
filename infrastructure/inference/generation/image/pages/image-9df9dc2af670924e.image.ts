import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9df9dc2af670924e = {
  id: "01a0c5f3-9f6b-748b-bc7a-8da1e68c0f37",
  type: "page-type/image",
  slug: "image-9df9dc2af670924e",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic radiant portrait of a beautiful young woman with sun-kissed skin and long wavy hair, soft joyful feminine smile, wearing a flattering summer swimsuit, on a sunlit beach, lots of warm bare skin, golden hour glow, relaxed playful feminine energy, 85mm, natural luminous skin detail, shallow depth of field",
  seed: 813546897,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
