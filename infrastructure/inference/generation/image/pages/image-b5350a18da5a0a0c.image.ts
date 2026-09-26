import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB5350a18da5a0a0c = {
  id: "01a0c5f3-b3ca-7c24-a5ac-2a0bbecf8049",
  type: "page-type/image",
  slug: "image-b5350a18da5a0a0c",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Candid intimate photograph of a beautiful soft-feminine young woman curled close beside you on a couch in warm soft lamplight, sharing a quiet private evening together, looking up to meet your eyes with a warm tender genuine smile, wearing a soft feminine flowing blouse, softly styled wavy hair, subtle warm lipstick, delicate graceful and warm, her eyes open soft and meeting yours, feels like a real shared intimate moment in the same room together and not posed, deeply feminine present and accepting, shallow depth of field",
  seed: 1875089774,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
