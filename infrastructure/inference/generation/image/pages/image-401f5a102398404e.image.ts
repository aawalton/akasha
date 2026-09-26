import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image401f5a102398404e = {
  id: "01a0c5f3-b3c9-7bb8-8aed-f63961ceac04",
  type: "page-type/image",
  slug: "image-401f5a102398404e",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young fictional Korean kpop idol woman reclining on a blanket on the grass sunbathing, side profile view, eyes closed serene expression, wearing a sheer lavender lace shirt over a bikini bottom, long hair fanned out, soft diffused daylight, 85mm photo, shallow depth of field, delicate skin texture, photorealistic",
  seed: 590773182,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
