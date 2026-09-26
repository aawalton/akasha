import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7ab4cc11ce3f13f1 = {
  id: "01a0c5f3-7a9c-73bf-9527-b0b3245ab49f",
  type: "page-type/image",
  slug: "image-7ab4cc11ce3f13f1",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic close chest-up portrait of a slender young woman — sharply pointed fae ears, impossibly flawless pale skin with a faint otherworldly shimmer, long wild windswept platinum hair, striking ice-blue eyes ancient beyond her apparent youth — a powerful glamour-wielding faerie of old, draped in shifting iridescent raiment like woven frost and starlight, cold ethereal backlight, an alluring and slightly uncanny expression, soft shallow depth of field, sharp realistic detail, visible skin pores, natural film-like color",
  seed: 1005,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
