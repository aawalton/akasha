import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1ff13f7640cdbdf5 = {
  id: "01a0c5f3-9f6a-7a75-b97f-1604e3c76923",
  type: "page-type/image",
  slug: "image-1ff13f7640cdbdf5",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman waist-deep in a glassy alpine lake, snow peaks behind, arms crossed loosely over her chest, morning mist on the water, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1779131461,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
