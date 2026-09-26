import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0140ceb25730c39a = {
  id: "01a0c5f3-b3c9-7bae-b3fe-5d3c98e7dfe7",
  type: "page-type/image",
  slug: "image-0140ceb25730c39a",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Tennessee personified as a beautiful young woman in her early twenties — honey-blonde waves, denim jacket over a stage dress, holding an acoustic guitar, purple irises at her feet and misty Great Smoky Mountains layered behind her, warm blue-hour mountain dusk, photorealistic photograph, natural skin texture, film grain, three-quarter view portrait",
  seed: 1899923898,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
