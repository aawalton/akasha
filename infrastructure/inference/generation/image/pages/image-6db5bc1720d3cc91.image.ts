import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6db5bc1720d3cc91 = {
  id: "01a0c5f3-690e-7d6c-b66f-a23cab81f333",
  type: "page-type/image",
  slug: "image-6db5bc1720d3cc91",
  persona: "persona/elaine",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a beautiful petite young woman with slim curves, long flowing brunette hair, very fair porcelain skin, striking clear blue eyes, vain and confident, a delighted knowing smile with warmth and allure aimed right at the viewer, wearing a dress made entirely of LIVING FLAME — the gown itself formed from swirling orange, gold and crimson fire and glowing embers clinging to her figure, fire-adjacent palette, warm golden dawn radiance, cinematic lighting, ultra detailed, sharp focus, no bird, glancing back over one bare shoulder, coy vain smile, embers drifting, subtle wings of flame, golden hour",
  seed: 638137878,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
