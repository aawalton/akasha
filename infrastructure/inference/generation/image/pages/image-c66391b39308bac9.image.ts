import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC66391b39308bac9 = {
  id: "019f58c9-0e66-7183-b814-2948d614b3a5",
  type: "page-type/image",
  slug: "image-c66391b39308bac9",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude plant-lady woman carrying a big potted fern that covers her torso, leaves framing her grin, sunroom, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 434101041,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
