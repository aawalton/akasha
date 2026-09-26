import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC49b4d0f8dfa9822 = {
  id: "01a0c5f3-b3c9-7aad-9098-2b4253c09511",
  type: "page-type/image",
  slug: "image-c49b4d0f8dfa9822",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a breezy yellow dress and sunglasses pushed up in her hair on the Promenade des Anglais in Nice, azure sea and striped umbrellas behind, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1293229047,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
