import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB0ca6798f1d75f35 = {
  id: "01a0c5f3-b3c9-794b-9bbe-898b7f2ba6eb",
  type: "page-type/image",
  slug: "image-b0ca6798f1d75f35",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Vermont personified as a beautiful young woman in her early twenties — fair freckled skin, auburn hair in a loose braid, cream cable-knit sweater and red flannel scarf, holding a small jar of amber maple syrup, blazing autumn sugar-maple forest behind a weathered covered bridge, photorealistic portrait, three-quarter view, crisp golden autumn morning light",
  seed: 262374973,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
