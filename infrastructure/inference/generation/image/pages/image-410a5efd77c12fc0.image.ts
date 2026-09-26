import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image410a5efd77c12fc0 = {
  id: "01a0c5f2-eb23-7a6b-8b5c-8502018dcbf8",
  type: "page-type/image",
  slug: "image-410a5efd77c12fc0",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying a playful catgirl, cat ears headband and fitted costume, mischievous smile, cozy neon-lit room, 50mm, shallow depth of field, detailed costume, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
