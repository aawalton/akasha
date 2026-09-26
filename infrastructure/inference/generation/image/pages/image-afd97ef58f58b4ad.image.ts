import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAfd97ef58f58b4ad = {
  id: "01a0c5f3-efff-75c7-81db-298f0a991831",
  type: "page-type/image",
  slug: "image-afd97ef58f58b4ad",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "POV from below of a beautiful nude blonde woman riding astride the viewer, hips rocking mid-motion, full bare breasts swaying, head tipped back with parted lips, loose golden hair falling behind her shoulders, fair skin flushed and sheened, dim gold ember light before dawn, photorealistic, shallow depth of field, visible skin texture",
  seed: 2037384015,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
