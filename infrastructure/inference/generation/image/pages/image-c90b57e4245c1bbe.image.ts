import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC90b57e4245c1bbe = {
  id: "01a0c5f3-b3c8-74a4-81d8-13b6f24ae759",
  type: "page-type/image",
  slug: "image-c90b57e4245c1bbe",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "charming woman in a retro romper throwing a finger-gun and wink at the camera, carousel lights on a boardwalk, photorealistic photograph, natural skin texture, film grain",
  seed: 1519042826,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
