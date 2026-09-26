import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC75e811676a3509f = {
  id: "019f588e-2c98-74f2-98b9-770becf63dc1",
  type: "page-type/image",
  slug: "image-c75e811676a3509f",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman holding a wide-brim felt hat against her chest with both hands, mischievous eyes, autumn light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 185105255,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
