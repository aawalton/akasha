import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image21095e102dcc054a = {
  id: "019f1838-9cdf-74c4-8b25-080ac907af00",
  type: "page-type/image",
  slug: "image-21095e102dcc054a",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a woman who is exactly 30 years old, youthful but clearly a grown adult, smooth fair skin with no wrinkles, soft features, warm hazel eyes, light brown hair with a faint warm auburn tint, hair grown longer and loosely tied back with a few soft strands framing her face, wearing a simple t-shirt and an iconic canvas worker's apron, a small private smile, her hazel eyes warm and steady and intensely focused on the viewer as if the whole world has fallen away to just this game and this person, seated at a worn wooden table with a hand-carved wooden chess set, leaning slightly in, warm hearth firelight, cozy medieval fantasy inn with warm wooden walls, intimate close upper-body portrait, intensely detailed eyes, sharp focus on the eyes, photoreal, natural skin detail",
  seed: 715,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
