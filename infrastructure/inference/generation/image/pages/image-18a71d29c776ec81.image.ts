import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image18a71d29c776ec81 = {
  id: "01a0c5f3-b3c8-76d0-a20d-589d940e5147",
  type: "page-type/image",
  slug: "image-18a71d29c776ec81",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Alabama personified as a beautiful young woman in her early twenties — soft brunette waves with a white camellia tucked behind her ear, flowing cream sundress, standing at the edge of a longleaf pine forest with golden farmland behind, warm humid southern evening light, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 1670801676,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
