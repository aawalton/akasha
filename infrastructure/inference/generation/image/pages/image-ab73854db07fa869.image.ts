import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAb73854db07fa869 = {
  id: "01a0c5f3-b3c9-75a4-abc7-b95987b62e18",
  type: "page-type/image",
  slug: "image-ab73854db07fa869",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "defiant woman in leather-and-bronze warrior armor baring her midriff, sword planted before her, battle-ready glare, burning horizon, photorealistic photograph, natural skin texture, film grain",
  seed: 1110409273,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
