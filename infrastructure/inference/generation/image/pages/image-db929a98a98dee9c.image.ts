import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDb929a98a98dee9c = {
  id: "019f324d-3c27-74ae-ac6b-ce2a58b3395c",
  type: "page-type/image",
  slug: "image-db929a98a98dee9c",
  title: "Aine cover L2",
  relationshipLevel: "closeness-level/level-2",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a slim Celtic woman in her late twenties standing in a sunlit summer wheat field at golden hour, blazing red hair loose and glowing in the warm light, bright green eyes, fair freckled skin, serene radiant smile, looking directly at the camera, simple flowing cream linen dress, meadowsweet flowers around her, warm backlight, 85mm, shallow depth of field, photorealistic",
  seed: 701,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
