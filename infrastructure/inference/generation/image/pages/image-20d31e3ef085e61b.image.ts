import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image20d31e3ef085e61b = {
  id: "01a0c5f3-b3ca-774c-bb92-804753d67d47",
  type: "page-type/image",
  slug: "image-20d31e3ef085e61b",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Candid natural photograph, a real and warm young woman sitting by a sunlit window in a lived-in study, soft genuine closed-lip smile, looking at you with kind attentive eyes, completely natural unstyled wavy brown hair, real skin with visible pores freckles and a slight asymmetry, no glamour or retouching, simple olive linen shirt, soft daylight, candid imperfect and human, shallow depth of field, only her in frame, photorealistic, fine detail",
  seed: 1935606924,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
