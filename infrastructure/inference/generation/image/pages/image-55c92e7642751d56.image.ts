import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image55c92e7642751d56 = {
  id: "01a0c5f3-9f6f-7246-a291-1130c19f4101",
  type: "page-type/image",
  slug: "image-55c92e7642751d56",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a flowing coral summer dress descending the steep flower-lined stairs of Positano, pastel houses cascading behind her, golden afternoon, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1762076565,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
