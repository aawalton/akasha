import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4646f0773a7bcdb2 = {
  id: "01a0c5f3-b3c8-76a5-ab99-3287035d813a",
  type: "page-type/image",
  slug: "image-4646f0773a7bcdb2",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic fantasy art of a young cat girl with a slim petite youthful figure, small slender frame, fluffy calico cat ears and a long matching tail, golden slit-pupil eyes, tousled orange-and-white hair, playful grin, faint freckles, wearing an oversized cozy knit sweater, curled up on a windowsill in warm afternoon light, tasteful, 35mm full length, photorealistic",
  seed: 871,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
