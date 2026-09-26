import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image26bf1589d43249d9 = {
  id: "01a0c5f3-9f6c-7fa8-b42a-182f96b63e84",
  type: "page-type/image",
  slug: "image-26bf1589d43249d9",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "woman wrapped in a chunky knit blanket cocoon slipping open to reveal a bare shoulder, hip and leg, snug afternoon light, beautiful young woman, face fully in frame looking directly at the camera with intimate eye contact, photorealistic photograph, natural skin texture, soft flattering light, film grain, tasteful fine-art nude photography",
  seed: 572619793,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
