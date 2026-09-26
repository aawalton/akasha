import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9b476484716ca04b = {
  id: "01a0c5f3-b3c7-7741-a5cd-53b36956b119",
  type: "page-type/image",
  slug: "image-9b476484716ca04b",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "giddy woman in a beaded 1920s flapper dress with finger-wave hair mid-charleston kick, speakeasy in gold haze, photorealistic photograph, natural skin texture, film grain",
  seed: 967903416,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
