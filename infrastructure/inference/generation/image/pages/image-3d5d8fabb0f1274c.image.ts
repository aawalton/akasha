import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3d5d8fabb0f1274c = {
  id: "01a0c5f3-2541-7c33-9e31-538e03e7fed8",
  type: "page-type/image",
  slug: "image-3d5d8fabb0f1274c",
  persona: "persona/aine",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a slim Celtic woman kneeling in a summer meadow full of cream meadowsweet flowers, blazing red wavy hair, green eyes, fair skin with freckles, warm gentle smile looking up at the camera, light floral summer dress, soft afternoon sunlight, bees and pollen in the warm air, 85mm, shallow depth of field, photorealistic",
  seed: 704,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
