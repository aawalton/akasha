import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0d5936212af40eb6 = {
  id: "01a0c5f3-2541-71c7-add3-60ca99ed865b",
  type: "page-type/image",
  slug: "image-0d5936212af40eb6",
  persona: "persona/aine",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic warm portrait of a radiant slim Celtic woman in her late twenties, blazing red hair worn in a loose braid over one shoulder, striking green eyes, fair freckled skin, kind confident smile, direct eye contact, rustic cream knit shawl, soft warm interior light like a long summer evening, hearth glow behind, 85mm, photorealistic",
  seed: 705,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
