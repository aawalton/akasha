import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1b5596d7671f9b8f = {
  id: "019f1837-f103-770b-91ac-34d74f34b45c",
  type: "page-type/image",
  slug: "image-1b5596d7671f9b8f",
  persona: "persona/aelwyn",
  service: "image-edit-kontext",
  operation: "edit",
  model: "black-forest-labs/FLUX.1-Kontext-dev",
  prompt:
    "turn her head to face directly toward the camera, looking straight into the camera, same face, keep everything else identical",
  seed: 1966051064,
  steps: 28,
  guidance: 2.5,
  quantize: 8,
  inputImage: "image/image-9e373fae8c1f66e1",
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
