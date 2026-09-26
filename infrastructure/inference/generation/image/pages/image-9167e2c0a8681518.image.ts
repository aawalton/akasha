import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9167e2c0a8681518 = {
  id: "01a0c5f3-7a9c-7c11-a5cc-aa91f178fc32",
  type: "page-type/image",
  slug: "image-9167e2c0a8681518",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a sheer slip standing at a bright window, body silhouetted through the fabric, ethereal light, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 618673324,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
