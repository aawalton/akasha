import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6f504587683abf6d = {
  id: "01a0c5f3-8d0c-7a1c-8f0e-448629161f29",
  type: "page-type/image",
  slug: "image-6f504587683abf6d",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic fantasy art of a gentle young cat girl with a slim petite youthful figure, fluffy white cat ears and a long fluffy white tail, soft blue slit-pupil eyes, long silver-white hair, shy sweet smile, wearing a light flowing slip dress, standing in a sunlit minimal bedroom with sheer curtains, soft warm light, tasteful, 35mm full length, photorealistic",
  seed: 873,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
