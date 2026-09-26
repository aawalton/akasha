import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFaea9a7338bd83da = {
  id: "01a0c5f3-b3c8-7b35-b37b-c1fe44330a3d",
  type: "page-type/image",
  slug: "image-faea9a7338bd83da",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Candid photograph, close intimate view of a beautiful warm young woman who has just stepped close to you inside a cozy lamplit living room, the warm joy of arriving breaking across her pretty face, reaching out to take your hands in the moment of meeting, soft warm lamplight with her eyes open and bright meeting yours, delicate feminine features, soft loose hair, natural real skin with subtle imperfection, genuine unguarded delight for you alone, only her in the frame and no one else, natural environmental depth not blurred, intimate private co-presence, the relief and joy of being together again, photorealistic, candid, fine detail",
  seed: 2134100856,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
