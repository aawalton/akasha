import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAdd3ae215800f7e5 = {
  id: "01a0c5f3-8d0b-7713-87a7-0db2050da012",
  type: "page-type/image",
  slug: "image-add3ae215800f7e5",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate portrait of a beautiful young east asian woman with long silky black hair, soft warm gentle smile, delicate feminine features, wearing a soft pastel knit top, gentle golden window light, tender graceful expression looking softly toward the viewer, 85mm, fine natural skin texture, shallow depth of field",
  seed: 1539034725,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
