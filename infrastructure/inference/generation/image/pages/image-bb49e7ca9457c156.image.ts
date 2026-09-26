import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBb49e7ca9457c156 = {
  id: "01a0c5f3-b3c8-72a6-bc21-5ce38adf94af",
  type: "page-type/image",
  slug: "image-bb49e7ca9457c156",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Idaho personified as a beautiful young woman in her early twenties — light brown hair in a loose braid, cozy quilted vest over flannel, holding purple camas lilies, the jagged Sawtooth mountains and a clear alpine river behind her, cool clean mountain morning light, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 881732820,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
