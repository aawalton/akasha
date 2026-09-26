import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCcadd23b4e94bfc5 = {
  id: "01a0c5f3-9f6a-7031-9047-e69125f0a8d2",
  type: "page-type/image",
  slug: "image-ccadd23b4e94bfc5",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young fictional Korean kpop idol woman reclining on a blanket on the grass sunbathing, side profile view, eyes closed serene expression, wearing a lavender bikini, long hair fanned out, soft diffused daylight, 85mm photo, shallow depth of field, delicate skin texture, photorealistic",
  seed: 453736500,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
