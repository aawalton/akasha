import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4c3641d00cd1cc97 = {
  id: "01a0c5f3-8d0d-7409-aecb-1bf97ddd5783",
  type: "page-type/image",
  slug: "image-4c3641d00cd1cc97",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "full-body photorealistic fantasy art of a striking adult night fae woman, mid-twenties, slender figure, large luminous violet moth wings with glowing patterns, long dark hair, glowing lavender eyes, mysterious confident smile, dark iridescent dress, hovering in a moonlit forest with fireflies, cool blue and violet magical light, 35mm full length, photorealistic",
  seed: 843,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
