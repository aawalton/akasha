import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4df43e363a5ea654 = {
  id: "01a0c5f3-9f6f-75bc-ae8b-03afb4fea603",
  type: "page-type/image",
  slug: "image-4df43e363a5ea654",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a straw hat and white dress standing waist-deep in a blooming Provence lavender field, purple rows to the horizon, evening gold, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 893551007,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
