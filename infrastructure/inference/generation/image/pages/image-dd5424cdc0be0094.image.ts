import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDd5424cdc0be0094 = {
  id: "01a0c5f3-9f6a-792f-abd9-f65aca073df1",
  type: "page-type/image",
  slug: "image-dd5424cdc0be0094",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman swimming in the glowing blue light of a Capri grotto, bikini top held in one hand, water up to her waist, cave light on wet skin, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1648924432,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
