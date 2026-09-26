import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2e0272bfbbc4e39d = {
  id: "019f58b1-58c0-7396-9bd1-a1c698ac3d35",
  type: "page-type/image",
  slug: "image-2e0272bfbbc4e39d",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman on a beach holding a large diamond kite against her body, wind in her hair, bright coastal light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1318175546,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
