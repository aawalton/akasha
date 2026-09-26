import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image94d235d6ec420aab = {
  id: "01a0c5f3-b3c8-710f-86c0-56500c3db8f3",
  type: "page-type/image",
  slug: "image-94d235d6ec420aab",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Kentucky personified as a beautiful young woman in her early twenties — dark hair under a wide-brimmed derby hat with goldenrod trim, elegant spring dress, a chestnut thoroughbred horse and white plank fences on rolling bluegrass hills behind her, soft misty morning light, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 1203711157,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
