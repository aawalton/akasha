import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF8f116e8ae77fb6f = {
  id: "019f1839-077b-7b3e-8716-9d9ffe68edac",
  type: "page-type/image",
  slug: "image-f8f116e8ae77fb6f",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic three-quarter-length fantasy portrait of two ethereal young women with pale luminous skin, one platinum-blonde and one with soft lavender hair, gazing into each other's eyes in tender closeness, glowing fantasy ambiance with floating light motes, flowing gowns, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80280011,
  width: 896,
  height: 1152,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
