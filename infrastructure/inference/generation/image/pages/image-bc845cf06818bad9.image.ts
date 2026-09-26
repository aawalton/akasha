import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBc845cf06818bad9 = {
  id: "01a0c5f3-b3c9-7246-ba39-04098017a8c5",
  type: "page-type/image",
  slug: "image-bc845cf06818bad9",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Beautiful woman with warm brown skin on the steps of a jungle temple at sunset, finely woven sheer cotton wrap glowing translucent in the low orange sun, heavy gold collar and jade ear flares, long black hair, one hip against a carved stone jaguar, direct confident gaze, macaws and thick green canopy behind, painterly realism, gold and emerald\n",
  seed: 692869832,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
