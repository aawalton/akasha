import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image85f0c70a31e46b52 = {
  id: "01a0c5f2-eb20-76b1-b71d-07e249728780",
  type: "page-type/image",
  slug: "image-85f0c70a31e46b52",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman sitting on rocks by a clear flowing river, casual outdoor wear, soft dappled light through trees, relaxed smile toward the viewer, 35mm, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
