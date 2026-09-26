import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC8bdc5aa8477fdc3 = {
  id: "019f57e4-17d2-7a2c-9be8-b12adf2ab1f4",
  type: "page-type/image",
  slug: "image-c8bdc5aa8477fdc3",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid woman in a silk slip skirt and white ribbed tank hailing a cab mid-laugh, rainy city crosswalk, umbrella-lit night, photorealistic photograph, natural skin texture, film grain",
  seed: 1643556565,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
