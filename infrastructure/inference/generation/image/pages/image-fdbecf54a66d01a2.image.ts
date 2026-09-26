import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFdbecf54a66d01a2 = {
  id: "01a0c5f3-9f6d-7113-a4df-445ba5686778",
  type: "page-type/image",
  slug: "image-fdbecf54a66d01a2",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic full-body portrait photograph of a beautiful young elf woman, 20 years old, youthful delicate features, long silver hair, pale luminous skin, delicate pointed ears, striking eyes, confident seductive direct gaze, alluring smile, wearing a skimpy string bikini, curvy figure, standing with a sensual hip pose, soft dramatic rim lighting, bold and sensual, detailed skin texture, sharp focus, cinematic, photoreal not painterly",
  seed: 310,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
