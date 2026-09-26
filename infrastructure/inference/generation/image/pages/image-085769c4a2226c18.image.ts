import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image085769c4a2226c18 = {
  id: "019f2019-4205-7094-851f-f9763771a6c6",
  type: "page-type/image",
  slug: "image-085769c4a2226c18",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic full-body portrait photograph of a stunning dark elf woman, deep dusky grey-brown skin, long flowing white-silver hair, pointed ears, luminous violet eyes, wearing a black bikini with fine silver accents, dramatic torchlit obsidian setting, dangerous and alluring, detailed skin texture, sharp focus, cinematic, photoreal not painterly",
  seed: 303,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
