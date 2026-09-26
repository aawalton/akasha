import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCd1767e23468c9d2 = {
  id: "01a0c5f3-b3c9-773d-88e7-1361b29aa01c",
  type: "page-type/image",
  slug: "image-cd1767e23468c9d2",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "sun-kissed woman in a white crochet beach dress at an Ibiza beach bar at sunset, drink in hand, salt-tousled hair, amber sky, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 208846742,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
