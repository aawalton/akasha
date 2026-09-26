import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image316b7f64d066daaa = {
  id: "01a0c5f2-f92d-7fd7-9a59-beb6f42332cf",
  type: "page-type/image",
  slug: "image-316b7f64d066daaa",
  persona: "persona/aelwyn",
  service: "image-gen-aelwyn",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "aelwynz woman, long pointed elven ears, auburn-chestnut hair worn loose, vivid emerald-green eyes, in an ancient towering redwood forest, soft dappled green light, fitted athletic top, serene attentive expression, 85mm portrait, shallow depth of field, visible skin texture, photo",
  seed: 175327341,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
