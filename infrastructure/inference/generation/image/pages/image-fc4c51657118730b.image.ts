import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFc4c51657118730b = {
  id: "01a0c5f3-9f6e-7831-836e-3ea4876c9282",
  type: "page-type/image",
  slug: "image-fc4c51657118730b",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "candid photo of a young Korean woman in her mid-twenties with a slim petite kpop-idol figure, standing in the rain glancing back over her shoulder with a delighted smile, soaked, wet lingerie, raindrops on her skin, soft natural light, lush green background, spontaneous candid snapshot",
  seed: 480358766,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
