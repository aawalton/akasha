import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB4aec161ef0fdca0 = {
  id: "01a0c5f3-b3c8-73f1-a89a-960552c71a30",
  type: "page-type/image",
  slug: "image-b4aec161ef0fdca0",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Arizona personified as a beautiful young woman in her early twenties — sun-bronzed skin, dark hair with a single turquoise-and-silver hairpiece, terracotta and turquoise flowing dress, standing among saguaro cacti at sunset, red rock mesas behind, warm orange and violet sky, photorealistic portrait, three-quarter view, cinematic natural light",
  seed: 2143053690,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
