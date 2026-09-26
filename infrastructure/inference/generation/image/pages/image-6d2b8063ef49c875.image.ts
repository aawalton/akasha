import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6d2b8063ef49c875 = {
  id: "01a0c5f3-b3c9-75a4-be5c-330b4d358e78",
  type: "page-type/image",
  slug: "image-6d2b8063ef49c875",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a bikini top and linen shirt at the bow of a sailboat on the Adriatic, islands scattered behind, spray and brilliant sun, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 607796688,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
