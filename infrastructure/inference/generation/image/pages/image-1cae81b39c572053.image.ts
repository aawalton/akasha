import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1cae81b39c572053 = {
  id: "01a0c5f4-03a3-74bc-ad3e-e68b70834e95",
  type: "page-type/image",
  slug: "image-1cae81b39c572053",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "two nude adult women lying together on a bed, intimate bedroom scene, photorealistic, 50mm photo, soft natural window light, visible skin texture, relaxed natural poses, shallow depth of field",
  seed: 1629297204,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
