import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6c8e535e468c43fc = {
  id: "01a0c5f3-b3ca-7611-9d4b-cf9f84462261",
  type: "page-type/image",
  slug: "image-6c8e535e468c43fc",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman wrapped in a plush fur throw slipping off her shoulders and hip, bare skin beneath, luxe firelight, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 493744099,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
