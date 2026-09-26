import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image68dfd6134952c404 = {
  id: "01a0c5f3-7a9b-784f-80d4-42cc09a9732c",
  type: "page-type/image",
  slug: "image-68dfd6134952c404",
  grade: "A+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "nude woman reclining in the shallow turquoise water of an Aegean sea cave, water lapping her bare breasts, wet hair, luminous reflected light, siren gaze, beautiful young woman, face fully in frame looking directly at the camera with warm eye contact, photorealistic photograph, natural skin texture, golden summer light, film grain, candid travel editorial photography",
  seed: 2025000498,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
