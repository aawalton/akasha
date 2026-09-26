import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image772cbe76d3d9dbd5 = {
  id: "01a0c5f2-eb1d-7ac0-8f8e-85ccf8cc4822",
  type: "page-type/image",
  slug: "image-772cbe76d3d9dbd5",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a glamorous red satin red-carpet gown, posing on a red carpet with soft flashbulb light, radiant confident smile, 85mm, shallow depth of field, fine fabric sheen, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
