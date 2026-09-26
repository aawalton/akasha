import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image07521b6fc592f154 = {
  id: "01a0c5f3-3620-7c4e-900b-fc4ad12db10c",
  type: "page-type/image",
  slug: "image-07521b6fc592f154",
  persona: "persona/amy",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "outdoor photo of a woman in her early 30s lying on a beach towel propped on her elbows, looking up at the camera with direct warm eye contact, playful soft smile, long straight blonde hair with a side part falling loose, naturally pretty face with soft features, light freckles, minimal makeup, real skin texture, blue eyes, fair skin, dusty-rose bikini, soft afternoon beach light, 50mm, photorealistic",
  seed: 414,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
