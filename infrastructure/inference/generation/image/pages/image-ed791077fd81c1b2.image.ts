import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEd791077fd81c1b2 = {
  id: "019f28c2-f121-7ed1-9bc6-e4f4bac78f79",
  type: "page-type/image",
  slug: "image-ed791077fd81c1b2",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, head and shoulders to chest, of a petite young woman in her mid-twenties leaning back against warm stone at golden hour. Long black hair loose over one shoulder. A finely woven band of undyed cloth covers her eyes, tied behind her head, ends trailing — worn like jewelry. Below it a wry, knowing half-grin, deeply at ease, faintly teasing. Languid relaxed pose, head tipped back a little. Earth-toned linen wrap slipping off one shoulder. Golden light, dry grass and stone bokeh, natural skin texture, 85mm lens, photoreal.",
  seed: 6210,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
