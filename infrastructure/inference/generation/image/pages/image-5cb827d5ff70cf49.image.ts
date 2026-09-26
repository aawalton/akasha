import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5cb827d5ff70cf49 = {
  id: "01a0c5f4-03a4-7d0e-b057-be63d7e6f317",
  type: "page-type/image",
  slug: "image-5cb827d5ff70cf49",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a fashion model in her twenties posing on a mossy rock in front of a tall waterfall, athletic outfit, confident stance, mist and a faint rainbow, dramatic editorial fashion photograph, 50mm, natural light",
  seed: 1518525973,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
