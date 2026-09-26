import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1605d44ee20a44aa = {
  id: "01a0c5f3-9f6d-7b74-acb7-d558b070c7fd",
  type: "page-type/image",
  slug: "image-1605d44ee20a44aa",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait photograph of an ethereally beautiful young elf woman, 19 years old, youthful delicate fine-boned features, long flowing silver hair, pale luminous moonlit skin, delicate pointed ears, soft pale eyes, tender sensual expression, slightly parted lips, wearing a delicate pale bikini, soft ethereal moonlight, dreamy and intimate, graceful, detailed skin texture, sharp focus, cinematic, photoreal not painterly",
  seed: 306,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
