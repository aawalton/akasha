import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image48d2adf49d5e20ca = {
  id: "01a0c5f3-f000-7947-a7dd-48427fb676f0",
  type: "page-type/image",
  slug: "image-48d2adf49d5e20ca",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a nude couple in bed, a beautiful blonde woman riding a man in slow deep rhythm, his hands cupping her full breasts as she rocks, her hands covering his, head tipped and lips parted, golden hair over one shoulder, fair skin flushed rose, warm low firelight, rumpled linen, photorealistic, shallow depth of field, visible skin texture",
  seed: 1971986684,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
