import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBf59a014fe62e161 = {
  id: "01a0c5f3-9f6f-71c0-8c10-692ad8b00a81",
  type: "page-type/image",
  slug: "image-bf59a014fe62e161",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Attractive woman caught in a downpour inside a glass conservatory, soaked thin linen dress clinging, hair plastered, hands braced on a wet iron rail among enormous ferns and palms, laughing directly at the camera, humid green light and rain sheeting off the glass, lush botanical fashion photography\n",
  seed: 1887779505,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
