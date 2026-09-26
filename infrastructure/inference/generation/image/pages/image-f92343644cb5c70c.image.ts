import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF92343644cb5c70c = {
  id: "01a0c5f4-03a3-7b71-8085-90d7cc20592e",
  type: "page-type/image",
  slug: "image-f92343644cb5c70c",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid photo of two young Korean women in their mid-twenties, slim kpop-idol builds, in a close affectionate back-hug in warm tropical rain under palm leaves, both laughing with delight, drenched, wet lingerie, rain streaming down, warm soft light, dynamic spontaneous candid snapshot",
  seed: 1277161552,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
