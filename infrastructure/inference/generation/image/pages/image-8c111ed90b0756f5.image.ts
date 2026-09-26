import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8c111ed90b0756f5 = {
  id: "01a0c5f3-8d0e-75f6-94ff-b9a24adc10f8",
  type: "page-type/image",
  slug: "image-8c111ed90b0756f5",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "fully nude woman sunbathing on a Mykonos rooftop, oiled skin gleaming, on her back with one knee bent, hand resting low on her belly, blue domes behind, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1069319187,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
