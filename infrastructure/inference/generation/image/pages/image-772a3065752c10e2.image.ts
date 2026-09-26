import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image772a3065752c10e2 = {
  id: "01a0c5f3-9f6a-7d38-8413-99236e72d23b",
  type: "page-type/image",
  slug: "image-772a3065752c10e2",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman on an Amalfi hotel balcony at sunrise in an open silk robe with nothing beneath, coffee cup in hand, sea and pastel village far below, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1314551209,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
