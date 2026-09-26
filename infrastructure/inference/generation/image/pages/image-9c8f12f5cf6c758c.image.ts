import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9c8f12f5cf6c758c = {
  id: "01a0c5f2-eb23-7d31-b49a-1db210f3bb13",
  type: "page-type/image",
  slug: "image-9c8f12f5cf6c758c",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman wearing a loose draped top and black tights, curled up on a couch with her knees tucked, soft relaxed smile toward the viewer, cozy evening lamplight, 50mm, shallow depth of field, fine fabric texture, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
