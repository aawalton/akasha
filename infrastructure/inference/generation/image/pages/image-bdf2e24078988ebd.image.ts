import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBdf2e24078988ebd = {
  id: "01a0c5f2-eb24-747b-9d5f-ddba74afb4ef",
  type: "page-type/image",
  slug: "image-bdf2e24078988ebd",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman resting her head down and looking up softly at the viewer, intimate close framing from above as if lying beside her, gentle affectionate eyes, soft morning light, 35mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
