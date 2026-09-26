import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image596f7faa02db152d = {
  id: "01a0c5f3-690e-7699-9f3d-ea419714015f",
  type: "page-type/image",
  slug: "image-596f7faa02db152d",
  persona: "persona/elaine",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a beautiful petite young woman with slim curves, long flowing brunette hair, very fair porcelain skin, striking clear blue eyes, vain and confident, a delighted knowing smile with warmth and allure aimed right at the viewer, wearing a dress made entirely of LIVING FLAME — the gown itself formed from swirling orange, gold and crimson fire and glowing embers clinging to her figure, fire-adjacent palette, warm golden dawn radiance, cinematic lighting, ultra detailed, sharp focus, no bird, facing forward, radiant wings of fire spread behind her, a faint halo of golden light, regal and alluring",
  seed: 337559426,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
