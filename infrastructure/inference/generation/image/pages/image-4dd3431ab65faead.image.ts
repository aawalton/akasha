import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4dd3431ab65faead = {
  id: "01a0c5f3-b3c9-7250-b2ca-edbac2462973",
  type: "page-type/image",
  slug: "image-4dd3431ab65faead",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman kneeling on a bed clutching a rumpled sheet to her body, bare shoulders and back exposed, low golden lamplight, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1284799689,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
