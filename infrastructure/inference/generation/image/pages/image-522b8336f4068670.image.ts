import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image522b8336f4068670 = {
  id: "01a0c5f3-9f6a-7f3f-bf19-8adc744dcbaa",
  type: "page-type/image",
  slug: "image-522b8336f4068670",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman at a Côte d'Azur beach club in an open-weave crochet dress with nothing beneath, skin showing through the knit, champagne in hand, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 2115193836,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
