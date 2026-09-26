import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image88247e86c6189989 = {
  id: "01a0c5f2-eb20-78fb-b52d-ba8a83ef1993",
  type: "page-type/image",
  slug: "image-88247e86c6189989",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman near a lush waterfall, fine mist in the air, casual hiking layers, soft awed smile, natural relaxed pose, soft diffused light, vibrant green foliage, 35mm, shallow depth of field, visible skin texture, photoreal",
  seed: 41,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
