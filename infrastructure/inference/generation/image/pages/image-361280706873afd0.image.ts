import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image361280706873afd0 = {
  id: "019f28c3-c6d3-7047-af88-60bda29441d4",
  type: "page-type/image",
  slug: "image-361280706873afd0",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, head and shoulders to chest, of a small sturdy young woman in her mid-twenties standing planted on mountain rock, dawn mist below. Black hair loosely gathered, wisps escaping. A soft clay-red woven eye-cloth bound over her eyes, neat and beautiful. Confident amused smirk, as if she heard something the viewer didn't. Shoulders easy, spine tall, weight settled on one hip. Cream linen wrap top, terracotta shawl at her elbows. Warm side light, natural skin texture with faint freckles, 85mm lens, photoreal.",
  seed: 6211,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
