import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image862c3e52333cac71 = {
  id: "019f1839-0908-73ab-940e-ee6f60258778",
  type: "page-type/image",
  slug: "image-862c3e52333cac71",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic fantasy intimate portrait of two young enchantress lovers sharing an alive breathless kiss, bare skin, one warm auburn and one raven-haired, a subtle magical golden glow wreathing them, sensual and otherworldly, warm cinematic light, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80380011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
