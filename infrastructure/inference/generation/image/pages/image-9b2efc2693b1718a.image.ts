import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9b2efc2693b1718a = {
  id: "01a0c5f2-eb1f-7c18-9d46-c1ee37143ae9",
  type: "page-type/image",
  slug: "image-9b2efc2693b1718a",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in tight black yoga pants and a loose flowy top outdoors on a park path, casual relaxed stride, soft daylight, cheerful smile toward the viewer, 35mm, candid, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
