import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5acc98c2dc6f1eee = {
  id: "01a0c5f3-9f6b-716d-8523-20dea6a733aa",
  type: "page-type/image",
  slug: "image-5acc98c2dc6f1eee",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman half-wrapped in a cloud of soft tulle, delicate and romantic, high-key light, beautiful young woman, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 1702704372,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
