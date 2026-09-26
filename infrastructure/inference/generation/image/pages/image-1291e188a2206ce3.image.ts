import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1291e188a2206ce3 = {
  id: "01a0c5f3-8d0f-70df-bb0c-f2abeb6cb270",
  type: "page-type/image",
  slug: "image-1291e188a2206ce3",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Alaska personified as a beautiful young woman in her early twenties — pale luminous skin, ice-blue eyes, long black hair dusted with snow, white fur-trimmed parka hood framing her face, aurora borealis rippling green and violet across a starry sky behind snowy peaks, photorealistic portrait, three-quarter view, cold moonlit night light",
  seed: 1224905935,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
