import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDcace7d510feb19e = {
  id: "01a0c5f2-eb25-7c33-b4ad-5f687c8f2181",
  type: "page-type/image",
  slug: "image-dcace7d510feb19e",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a satin bustier and panties standing in the bedroom, soft confident posture, warm window light, gentle smile toward the viewer, 50mm, shallow depth of field, fine fabric sheen, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
