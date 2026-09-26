import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC227d2b19712651c = {
  id: "01a0c5f3-efff-70da-83b1-11ee9aa484ca",
  type: "page-type/image",
  slug: "image-c227d2b19712651c",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a nude couple making love in bed, the man above between the beautiful blonde woman's spread thighs, deep in her, her legs wrapped around his waist, her hands gripping his back, her head pressed back into the pillow with parted lips, loose golden hair fanned across white linen, fair skin flushed, warm firelight, photorealistic, shallow depth of field, visible skin texture",
  seed: 1955204034,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
