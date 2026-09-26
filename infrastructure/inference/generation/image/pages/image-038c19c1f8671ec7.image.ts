import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image038c19c1f8671ec7 = {
  id: "01a0c5f3-9f6d-77d6-8c38-acc8f365f39c",
  type: "page-type/image",
  slug: "image-038c19c1f8671ec7",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic full-body portrait photograph of a beautiful wild elf woman, tousled dark brown hair, sun-tanned athletic body, pointed ears, warm hazel eyes, bone and shell jewelry, wearing a sandy earth-toned bikini, on a tropical beach at golden hour, free and radiant, detailed skin texture, sharp focus, cinematic, photoreal not painterly",
  seed: 304,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
