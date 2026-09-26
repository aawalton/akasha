import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7625a94b3b0e84de = {
  id: "01a0c5f2-eb20-73bd-a839-c1567f2e2c94",
  type: "page-type/image",
  slug: "image-7625a94b3b0e84de",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman sitting in a canoe on a calm autumn lake surrounded by colorful foliage, casual sweater, soft warm light, content peaceful smile, 35mm, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
