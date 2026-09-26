import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAc68be3df896d665 = {
  id: "019f5b4e-5ce6-7fe0-bf2e-3de861265ea2",
  type: "page-type/image",
  slug: "image-ac68be3df896d665",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a rust-colored slip dress standing in a Tuscan sunflower field at golden hour, cypress hills behind, warm honeyed light, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1325175345,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
