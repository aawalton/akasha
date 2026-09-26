import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image911edd8db1f53ff3 = {
  id: "019f28d8-e90c-723c-90e5-e673163b9cfa",
  type: "page-type/image",
  slug: "image-911edd8db1f53ff3",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, head and shoulders to chest, of a petite compact young woman in her mid-twenties perched forward on a boulder, elbows on knees, chin tipped up with a cocky lopsided smirk, one eyebrow raised — playful, planted, fearless. Long black hair loosely gathered, strands over her brow. Pale grey eyes, softly unfocused, just past the camera. Undyed linen wrap top, sleeves pushed up, leather cord necklace. Low warm dawn light, mountain mist behind. Natural skin texture, 85mm lens, photoreal documentary style.",
  seed: 6503,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
