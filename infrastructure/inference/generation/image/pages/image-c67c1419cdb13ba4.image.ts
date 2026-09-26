import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC67c1419cdb13ba4 = {
  id: "01a0c5f3-efff-7b83-9584-a9b49960854e",
  type: "page-type/image",
  slug: "image-c67c1419cdb13ba4",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "tight close-up of a beautiful blonde woman's face mid-lovemaking, blue eyes locked down at the viewer dark and sure, lips parted, breath ragged, deep flush across her cheeks and chest, loose golden hair swinging with her rhythm, warm ember light, photorealistic, 85mm, shallow depth of field, visible skin texture, fine flyaway hairs",
  seed: 950592420,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
