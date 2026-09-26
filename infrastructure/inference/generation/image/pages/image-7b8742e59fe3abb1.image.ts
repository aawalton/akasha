import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7b8742e59fe3abb1 = {
  id: "01a0c5f2-eb21-712c-9b46-ef7ceaceb7e9",
  type: "page-type/image",
  slug: "image-7b8742e59fe3abb1",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman by Tower Bridge in London, casual trench coat, soft overcast light, relaxed smile toward the viewer, the Thames behind, 35mm, candid travel photo, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
