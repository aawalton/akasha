import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image65b17e2c956718fa = {
  id: "01a0c5f3-7a9b-74fb-9c25-2785baa1090e",
  type: "page-type/image",
  slug: "image-65b17e2c956718fa",
  grade: "A+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman pressed lightly against a Berlin loft window at night, bare breasts against the glass reflection, city lights beyond, hungry gaze, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 2042127030,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
