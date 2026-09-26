import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5a1d5b0798bbad90 = {
  id: "019f28d9-b932-72fe-82d6-fe501f275a45",
  type: "page-type/image",
  slug: "image-5a1d5b0798bbad90",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, head and shoulders to chest, close in, of a petite compact young woman in her mid-twenties leaning forward toward the camera with elbows on her knees, perched on a boulder, head tilted with a cocky lopsided smirk, one eyebrow up — supremely confident, teasing, a lot of personality. Long black hair loosely gathered, escaped strands over her brow. Pale grey eyes, unfocused, aimed just past the lens. Earth-toned linen wrap, sleeves pushed up. Late warm light, rock haze behind. Natural skin texture, 85mm lens, photoreal documentary style.",
  seed: 6701,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
