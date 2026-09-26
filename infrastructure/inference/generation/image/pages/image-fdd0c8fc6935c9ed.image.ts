import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFdd0c8fc6935c9ed = {
  id: "01a0c5f3-b3ca-7223-b786-c49dd54bfc17",
  type: "page-type/image",
  slug: "image-fdd0c8fc6935c9ed",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Candid documentary-style photograph of a young woman relaxed and at ease in a warm sunlit room, curled comfortably on a couch as if sharing a quiet afternoon with someone she trusts, a soft genuine unposed half-smile, natural relaxed posture, caught in a real shared moment and NOT posing for the camera, warm intimate natural light, soft casual clothing, candid and alive and present, shallow depth of field",
  seed: 1187714740,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
