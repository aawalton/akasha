import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image85e28631e3ac65e5 = {
  id: "019f1838-9c0b-7d82-b776-8e9844e56503",
  type: "page-type/image",
  slug: "image-85e28631e3ac65e5",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a woman who is exactly 30 years old, youthful but clearly a grown adult, smooth fair skin with no wrinkles, soft features, warm hazel eyes, light brown hair with a faint warm auburn tint, hair grown longer and loosely tied back with a few soft strands framing her face, wearing a simple t-shirt and an iconic canvas worker's apron, a sly warm crooked grin, eyes glinting and locked on the viewer, seated at a worn wooden table with a hand-carved wooden chess set in soft foreground focus, leaning in, low warm hearth firelight with dramatic chiaroscuro on her face, deep cozy inn interior softly blurred behind, a candle on the table, close upper-body portrait, 85mm, shallow depth of field, cinematic, photoreal, intensely detailed eyes, sharp focus on the eyes",
  seed: 614,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
