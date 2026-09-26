import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image34a280d7e117b976 = {
  id: "01a0c5f3-b3c8-7898-beb0-9b494b32a466",
  type: "page-type/image",
  slug: "image-34a280d7e117b976",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Candid photograph, a warm and kind young woman walking toward you along a sunlit summer meadow path, her face breaking into a delighted radiant smile the instant she sees you, mid-step closing the distance toward you, loose hair moving in the breeze, natural real skin with subtle freckles and imperfections, genuine unguarded joy aimed right at you, light summer dress, only her in the frame and no one else, shallow depth of field, you are the one she is hurrying to, photorealistic, candid, fine detail",
  seed: 844231539,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
