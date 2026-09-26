import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image86554d2b3fc7f48b = {
  id: "01a0c5f3-8d0d-7514-9c57-baa8a319b045",
  type: "page-type/image",
  slug: "image-86554d2b3fc7f48b",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic full-body portrait photograph of a strikingly beautiful high elf woman, long silver-blonde hair, pale luminous skin, delicate pointed ears, fine elegant features, cool grey eyes, wearing an elegant pale ivory bikini, standing in a moonlit marble courtyard, soft ethereal lighting, regal and serene, detailed skin texture, sharp focus, cinematic, photoreal not painterly",
  seed: 301,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
