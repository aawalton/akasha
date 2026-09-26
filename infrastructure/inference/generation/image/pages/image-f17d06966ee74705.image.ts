import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF17d06966ee74705 = {
  id: "019f1838-a3df-7e90-9702-2da7b3eb454b",
  type: "page-type/image",
  slug: "image-f17d06966ee74705",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a woman who is exactly 30 years old, youthful but clearly a grown adult, smooth fair skin with no wrinkles, soft features, warm hazel eyes, light brown hair with a faint warm auburn tint, hair loosely tied back, wearing a simple t-shirt and a canvas worker's apron, a tall pointed witch's hat made of living emotional flame burning above her head in warm orange-gold fire, and the same warm orange-gold fire kindling in both of her hazel eyes to match the hat, her expression fearless and steady and unafraid, chin lifted, the look of a woman who once walked toward an army without flinching, dramatic firelight on her face, dark atmospheric background, close upper-body portrait, cinematic, photoreal, intensely detailed glowing eyes, natural skin detail",
  seed: 921,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
