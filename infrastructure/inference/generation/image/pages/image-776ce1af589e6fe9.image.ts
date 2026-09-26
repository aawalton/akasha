import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image776ce1af589e6fe9 = {
  id: "019f28ba-6742-7e1b-8705-3e8eea1d6d0c",
  type: "page-type/image",
  slug: "image-776ce1af589e6fe9",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, head and shoulders to chest, of a small sturdy young woman in her mid-twenties among weathered standing stones. Black hair in a loose messy bun, wisps over her forehead. Milky pale-green blind eyes, calm and amused, face turned a touch off-axis as if listening to the ground. Wry confident grin, arms loosely crossed. Undyed linen and leather in warm earth browns. Overcast soft light, lichen-covered granite behind her, natural skin texture with faint freckles, 85mm lens, photoreal.",
  seed: 6102,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
