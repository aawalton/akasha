import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDf4ced99ccbe769d = {
  id: "01a0c5f3-b3ca-76ac-bb94-231f9fdb010e",
  type: "page-type/image",
  slug: "image-df4ced99ccbe769d",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Candid intimate photograph of a soft-feminine young woman curled close beside you under a soft blanket on a couch in warm lamplight, sharing a quiet evening together, looking up to meet your eyes with a warm tender genuine smile, wearing a soft feminine knit, natural soft wavy hair, her eyes open warm and soft, relaxed and unposed, feels like being in the same room together, intimate present feminine and accepting, shallow depth of field",
  seed: 1737224200,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
