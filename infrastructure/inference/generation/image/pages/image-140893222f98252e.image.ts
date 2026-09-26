import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image140893222f98252e = {
  id: "01a0c5f2-eb1f-7421-be79-f592ceec3dfd",
  type: "page-type/image",
  slug: "image-140893222f98252e",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman on a casual street-food date, denim jacket and tee, holding street food, laughing toward the viewer, warm festive market lights, 35mm, candid, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
