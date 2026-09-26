import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3c4e69c2625d413d = {
  id: "01a0c5f3-9f6a-728a-8ac0-3d9fae375032",
  type: "page-type/image",
  slug: "image-3c4e69c2625d413d",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman on the white sand of a secluded Formentera beach, seated with knees drawn up, turquoise shallows behind, natural and unhurried, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 670298395,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
