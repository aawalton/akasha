import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image823da7a2e5ac7e6f = {
  id: "01a0c5f2-eb1e-7091-8a60-d92ef75b2aa2",
  type: "page-type/image",
  slug: "image-823da7a2e5ac7e6f",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, walking down a city street, wearing a short denim skirt and a tight white tank top, casual confident posture, golden-hour light, 85mm portrait, photoreal",
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
