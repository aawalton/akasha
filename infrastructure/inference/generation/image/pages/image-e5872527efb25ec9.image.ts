import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE5872527efb25ec9 = {
  id: "019f1838-7824-72d9-aae0-d58d4b0fd3f6",
  type: "page-type/image",
  slug: "image-e5872527efb25ec9",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Candid photograph, a joyful young woman standing on an open windswept clifftop meadow at golden hour, arms loose and free, wind lifting her hair and light dress, vast open sky and distant horizon behind her, a wide untethered openness, she turns to look at you with a free radiant smile, warm backlight, natural real skin, a feeling of total freedom and air, shallow depth of field, only her in frame, photorealistic, fine detail",
  seed: 391134185,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
