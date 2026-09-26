import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC9964234f135b3b6 = {
  id: "019f28d6-740b-7252-a3cb-520c1bbcadbe",
  type: "page-type/image",
  slug: "image-c9964234f135b3b6",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, head and shoulders to knees, of a petite compact young woman in her mid-twenties perched on a boulder like a throne, leaning forward with elbows on knees, bare feet gripping the stone, head tilted with a cocky lopsided smirk, one eyebrow up. Long black hair loosely gathered, escaped strands over her brow. Pale grey eyes, unfocused, aimed just past the camera. Earth-toned linen wrap, sleeves pushed up. Late warm light, scattered rocks behind. Natural skin texture, 85mm lens, photoreal documentary style.",
  seed: 6503,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
