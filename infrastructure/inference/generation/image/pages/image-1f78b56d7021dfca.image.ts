import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1f78b56d7021dfca = {
  id: "019f28d8-147d-7935-a64d-3d44287a2b43",
  type: "page-type/image",
  slug: "image-1f78b56d7021dfca",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, head and shoulders to chest, close in, of a petite compact young woman in her mid-twenties leaning forward toward the camera with elbows on her knees, perched on a boulder, head tilted with a cocky lopsided smirk, one eyebrow up — supremely confident, teasing, a lot of personality. Long black hair loosely gathered, escaped strands over her brow. Pale grey eyes, unfocused, aimed just past the lens. Earth-toned linen wrap, sleeves pushed up. Late warm light, rock haze behind. Natural skin texture, 85mm lens, photoreal documentary style.",
  seed: 6503,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
