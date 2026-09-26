import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFf3d9546111e59c1 = {
  id: "01a0c5f4-03a4-7996-9c5a-3cec8d67f96c",
  type: "page-type/image",
  slug: "image-ff3d9546111e59c1",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a fashion model in her twenties posing on rocks beside a tropical waterfall, one-piece swimsuit, confident editorial pose, fine mist in the air, lush green rainforest, editorial 85mm fashion photograph, soft natural light, visible skin texture",
  seed: 1198094817,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
