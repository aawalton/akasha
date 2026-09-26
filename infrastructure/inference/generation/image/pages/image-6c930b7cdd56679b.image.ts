import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6c930b7cdd56679b = {
  id: "019f28d3-f680-7835-be68-0bcbc311ef50",
  type: "page-type/image",
  slug: "image-6c930b7cdd56679b",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, head and shoulders to knees, of a petite compact young woman in her mid-twenties perched on a boulder like a throne, leaning forward with elbows on knees, bare feet gripping the stone, smug wide grin aimed straight at the camera. Long black hair loosely gathered, escaped strands over her brow. Blind eyes: flat matte white irises, unlit, non-reflective, no glow. Earth-toned linen wrap, sleeves pushed up. Late warm light, scattered rocks behind. Natural skin texture, 85mm lens, photoreal documentary style.",
  seed: 6503,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
