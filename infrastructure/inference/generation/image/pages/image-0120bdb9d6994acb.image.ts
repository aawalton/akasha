import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0120bdb9d6994acb = {
  id: "019f28da-db83-7213-96dd-e9df643b6134",
  type: "page-type/image",
  slug: "image-0120bdb9d6994acb",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, head and shoulders to waist, of a petite small-framed young woman in her mid-twenties with a compact athletic build, perched forward on a boulder, elbows on knees, head tilted with a cocky lopsided smirk, one eyebrow up — supremely confident, teasing, a lot of personality. Long black hair loosely gathered, escaped strands over her brow. Pale grey eyes, unfocused, aimed just past the lens. Wearing only a wrapped cloth breast-band in undyed earth-toned linen, bare midriff and shoulders, leather cord necklace. Late warm light, rock haze behind. Natural skin texture, 85mm lens, photoreal documentary style.",
  seed: 6503,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
