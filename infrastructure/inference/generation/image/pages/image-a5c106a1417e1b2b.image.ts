import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA5c106a1417e1b2b = {
  id: "019f28d2-5134-73a9-8135-595809d094c4",
  type: "page-type/image",
  slug: "image-a5c106a1417e1b2b",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, head and shoulders to chest, of a petite compact young woman in her mid-twenties standing planted on bedrock, arms crossed, head tilted with a cocky lopsided smirk — supremely confident, teasing, like she heard you coming a mile away. One eyebrow slightly raised. Long black hair loosely tied back, messy strands. Blind eyes open: flat matte white irises, unlit, non-reflective, faint pupil shadow, no glow whatsoever. Earth-toned linen wrap top. Warm afternoon light, mountain haze behind. Natural skin texture, 85mm lens, photoreal documentary style.",
  seed: 6501,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
