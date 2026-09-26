import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image75a448d3ef71366e = {
  id: "01a0c5f3-9f6f-76a2-aee8-e13f1fe4cfac",
  type: "page-type/image",
  slug: "image-75a448d3ef71366e",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a light dress on Charles Bridge in Prague at dawn, baroque statues in silhouette, mist on the Vltava, first gold light, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1112289195,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
