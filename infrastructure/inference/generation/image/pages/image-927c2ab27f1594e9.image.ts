import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image927c2ab27f1594e9 = {
  id: "019f1838-9cd9-7167-83fc-c5c06ca7981a",
  type: "page-type/image",
  slug: "image-927c2ab27f1594e9",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a woman who is exactly 30 years old, youthful but clearly a grown adult, smooth fair skin with no wrinkles, soft features, warm hazel eyes, light brown hair with a faint warm auburn tint, hair loosely tied back, wearing a simple t-shirt and a canvas worker's apron, standing unarmed and utterly unflinching, a fierce steady protective glare fixed on the viewer, chin level, the look of a woman who once stepped between drawn swords and a band of frightened goblins and simply said try it, fearless and immovable with real warmth and care burning under the steel, dramatic moody side light, dark tense atmospheric background, close upper-body portrait, cinematic, photoreal, intensely detailed eyes, sharp focus on the eyes, natural skin detail",
  seed: 941,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
