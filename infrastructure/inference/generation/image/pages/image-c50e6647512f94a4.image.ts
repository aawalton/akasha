import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC50e6647512f94a4 = {
  id: "019f1838-7178-7137-a4b4-c0196b6c04d7",
  type: "page-type/image",
  slug: "image-c50e6647512f94a4",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Candid photograph, a warm and kind young woman sitting close beside the viewer at a sunlit breakfast table on a quiet morning, soft natural window light, she is mid-laugh turned toward you sharing the moment, relaxed cozy oversized cream knit, loose hair, genuine warmth in her eyes, the framing places you in the seat across from her not behind a lens, shallow depth of field, intimate co-presence, photorealistic, fine detail",
  seed: 1876269550,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
