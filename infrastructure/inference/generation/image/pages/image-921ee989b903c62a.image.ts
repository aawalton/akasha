import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image921ee989b903c62a = {
  id: "01a0c5f3-9f6a-7126-98a9-033f4b714ed0",
  type: "page-type/image",
  slug: "image-921ee989b903c62a",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman wrapped loosely in a sheer hotel curtain by a Venetian window, canal light rippling on her skin, form softly visible through the gauze, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1787717466,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
