import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4e9e8eae95fcc389 = {
  id: "01a0c5f3-8d0e-797f-802d-8d7e279d8ffe",
  type: "page-type/image",
  slug: "image-4e9e8eae95fcc389",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman on a yacht cabin bed, bare body across white linen, porthole light striping her breasts and hips, adriatic blue outside, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 351815142,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
