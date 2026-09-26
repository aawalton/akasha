import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBcb258be729e5651 = {
  id: "01a0c5f3-9f6a-7323-b6ae-703e290dc70d",
  type: "page-type/image",
  slug: "image-bcb258be729e5651",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a Sicilian lemon garden with her linen dress unbuttoned to the navel, nothing beneath, sun through the leaves dappling her bare skin, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1503699470,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
