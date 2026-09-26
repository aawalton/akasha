import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5a7b7a1fc2839868 = {
  id: "01a0c5f3-8d0e-7116-a346-e2fed9b65771",
  type: "page-type/image",
  slug: "image-5a7b7a1fc2839868",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman leaning in a Lisbon hotel doorway, bare body in the corridor light, one arm above her head, hip cocked, come-here look, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1444397892,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
