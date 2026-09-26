import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF896bcb5dabfd23f = {
  id: "01a0c5f3-9f6d-7007-90a7-83b8c9be9cb2",
  type: "page-type/image",
  slug: "image-f896bcb5dabfd23f",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait photograph of an ethereally beautiful young elf woman, 19 years old, youthful delicate fine-boned features, long wet silver hair, glistening pale skin, delicate pointed ears, soft sensual gaze, wearing a delicate pale bikini, kneeling in shallow moonlit water, water droplets on skin, graceful sensual arch of the back, soft ethereal light, dreamy and seductive, detailed skin texture, sharp focus, cinematic, photoreal not painterly",
  seed: 311,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
