import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1a27c429a4a4492e = {
  id: "019f1839-39df-7bd2-ab40-c239864f1ed9",
  type: "page-type/image",
  slug: "image-1a27c429a4a4492e",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "A young princess-engineer in a high-fantasy solarpunk world, holding a massive ornate forging warhammer almost as tall as she is, its head gleaming brass and sun-catching crystal. She wears a Lolita-style princess dress of cream lace and brass over a leather tool-belt, a faint smudge of grease on one cheek, sleeves pushed up. Confident and warm, a spark of creation sparkling in her eyes. Golden-hour light in a garden-forge of living vines and warm metal. Beauty and craft together, painterly, luminous, detailed face.",
  seed: 4202,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
