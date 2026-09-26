import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image55df47c8187bac96 = {
  id: "019f1839-3212-7d4a-bb15-5599dbb63451",
  type: "page-type/image",
  slug: "image-55df47c8187bac96",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "A startlingly youthful woman in three-quarter view, smooth newly-made unlined face turned slightly to the light, eyes deep and still and ancient holding the grief of ages, loose hair, timeless and classical without ornament, cool soft daylight from a tall window, photorealistic portrait, the gap between the just-arrived face and the ageless gaze",
  seed: 105,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
