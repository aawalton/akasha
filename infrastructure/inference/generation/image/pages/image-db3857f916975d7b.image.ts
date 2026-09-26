import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDb3857f916975d7b = {
  id: "019f1900-c460-74a5-83f0-58895be6623c",
  type: "page-type/image",
  slug: "image-db3857f916975d7b",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait, chest-up, of an ageless, ethereally beautiful woman standing at a threshold in deep blue-violet twilight, carrying a small warm lantern that glows gold against the dusk. Her expression is serene and full of quiet compassion; her gaze is ancient, steady, unflinching, kind. The lantern's warm light catches her face and dark hair; the gathering night surrounds her. Cinematic, photoreal, natural skin texture, soft melancholy, the feeling of being gently led through the dark.",
  seed: 202,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
