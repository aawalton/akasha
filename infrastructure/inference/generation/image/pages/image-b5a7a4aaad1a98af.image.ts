import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB5a7a4aaad1a98af = {
  id: "019f1838-65be-74eb-912e-a0510112ed48",
  type: "page-type/image",
  slug: "image-b5a7a4aaad1a98af",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Candid photograph, close intimate view of a beautiful warm young woman who has JUST REACHED you, arriving close in the soft golden light of a cozy home doorway, her lovely face full of delighted joy at being with you right now, reaching toward you to close the last step of distance as if about to fall into your arms, soft warm directional light with her eyes open and bright and meeting yours, pretty delicate feminine features, loose hair, natural real skin, genuine unguarded delight aimed only at you, only her in the frame and no one else, natural environmental depth, intimate private co-presence, you are the one she has come home to, photorealistic, candid, fine detail",
  seed: 1169896825,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
