import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image37b4e6cf798a52d6 = {
  id: "01a0c5f3-8d0f-776e-93c8-a5d739084587",
  type: "page-type/image",
  slug: "image-37b4e6cf798a52d6",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic artistic nude fantasy art of a gentle young cat girl with a slim petite youthful figure, a beautiful human girls face with soft smooth human features, small human nose, full human lips, high cheekbones, soft blue slit-pupil eyes, fluffy white cat ears on top of her head and a long fluffy white tail, long silver-white hair flowing loose, shy sweet smile, nude natural figure, standing in a sunlit minimal bedroom with sheer curtains, soft warm light, tasteful fine-art nude, 35mm full length, photorealistic",
  seed: 894,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
