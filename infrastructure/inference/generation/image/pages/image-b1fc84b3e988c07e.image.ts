import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB1fc84b3e988c07e = {
  id: "019f5b53-aa28-79f4-9d7e-3a69f20b3aac",
  type: "page-type/image",
  slug: "image-b1fc84b3e988c07e",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman in a swimsuit sitting on a wooden jetty at a Berlin lake, legs in the water, pines and late golden light, relaxed summer freedom, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 1791140340,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
