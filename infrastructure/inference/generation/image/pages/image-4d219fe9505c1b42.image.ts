import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4d219fe9505c1b42 = {
  id: "01a0c5f3-7a9c-758c-9a81-d4c40501485e",
  type: "page-type/image",
  slug: "image-4d219fe9505c1b42",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "fully nude woman reclining on a white hotel bed above the Amalfi coast, bare breasts and hips, one knee raised, sultry parted lips, sea through the balcony doors, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1400914804,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
