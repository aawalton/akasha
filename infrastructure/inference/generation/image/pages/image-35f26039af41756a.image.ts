import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image35f26039af41756a = {
  id: "01a0c5f3-690e-7de3-b55d-deb58f2b1403",
  type: "page-type/image",
  slug: "image-35f26039af41756a",
  persona: "persona/elaine",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a beautiful petite young woman with slim curves, long flowing brunette hair, very fair porcelain skin, striking clear blue eyes, vain and confident, a delighted knowing smile with warmth and allure aimed right at the viewer, wearing a dress made entirely of LIVING FLAME — the gown itself formed from swirling orange, gold and crimson fire and glowing embers clinging to her figure, fire-adjacent palette, warm golden dawn radiance, cinematic lighting, ultra detailed, sharp focus, no bird, body tipped one way and head tipped the other, bouncy energetic motion, flames of the dress streaming, NO wings",
  seed: 759687173,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
