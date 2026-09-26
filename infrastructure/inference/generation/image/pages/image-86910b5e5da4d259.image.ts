import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image86910b5e5da4d259 = {
  id: "01a0c5f2-eb25-7727-bf56-faecde4cd02a",
  type: "page-type/image",
  slug: "image-86910b5e5da4d259",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, leaning against a doorway, wearing just a loose oversized white t-shirt, relaxed posture, bare legs, soft diffuse window light, 85mm portrait, fine fabric weave, photoreal",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
