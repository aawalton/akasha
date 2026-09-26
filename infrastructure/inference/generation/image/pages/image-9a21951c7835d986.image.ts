import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9a21951c7835d986 = {
  id: "01a0c5f3-9f6a-7c22-b6a9-e55c7ce2c6a0",
  type: "page-type/image",
  slug: "image-9a21951c7835d986",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in delicate lace lingerie at a tall Parisian window with shutters open, zinc rooftops behind, morning croissant abandoned on the sill, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1113829183,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
