import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1d38a4f7655aac46 = {
  id: "019f5b52-d568-7d0f-b435-86f4a93c3399",
  type: "page-type/image",
  slug: "image-1d38a4f7655aac46",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman on a bicycle with a flower basket pausing on an Amsterdam canal bridge, gabled houses reflected in the water, soft northern summer light, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 169244436,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
