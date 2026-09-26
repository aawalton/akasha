import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6b07f6aabfe0c9e8 = {
  id: "01a0c5f3-f000-739f-a311-3da6e68e9ef0",
  type: "page-type/image",
  slug: "image-6b07f6aabfe0c9e8",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "side view of a nude couple in bed, a beautiful blonde woman riding astride a man, joined at the hips mid-motion, her hands on his chest, his hands gripping her hips, her back arched, full breasts, loose golden hair swinging, dim gold ember light before dawn, rumpled white linen, photorealistic, shallow depth of field, visible skin texture",
  seed: 249789056,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
