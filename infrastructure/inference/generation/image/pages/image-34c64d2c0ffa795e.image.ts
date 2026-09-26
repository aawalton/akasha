import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image34c64d2c0ffa795e = {
  id: "01a0c5f3-9f6c-70e2-bdde-45bd836fa87a",
  type: "page-type/image",
  slug: "image-34c64d2c0ffa795e",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Candid intimate photograph of a young woman curled close on a couch in warm soft lamplight, looking up to meet your eyes with a soft tender genuine smile as if sharing a quiet private evening together, her eyes clearly visible open warm and soft, relaxed and unposed and natural, feels like a real shared moment in the same room and not a posed portrait, soft casual clothing, intimate present and accepting, shallow depth of field",
  seed: 927245108,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
