import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA760e2fea9f5dd83 = {
  id: "01a0c5f3-8d0f-74e3-8bfb-d54b893b0c22",
  type: "page-type/image",
  slug: "image-a760e2fea9f5dd83",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "raven-haired woman in a black velvet gown with thigh-high slit, seated on marble staircase with poised elegance, opera house, chandelier glow, photorealistic photograph, natural skin texture, film grain",
  seed: 1056557508,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
