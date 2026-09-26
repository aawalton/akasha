import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image16644bed6e684514 = {
  id: "01a0c5f3-9f6a-74c1-94aa-1798256699ec",
  type: "page-type/image",
  slug: "image-16644bed6e684514",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman in a grand Viennese hotel bathtub, water and bubbles to her waist, champagne coupe in hand, marble and gilt behind, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1711427299,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
