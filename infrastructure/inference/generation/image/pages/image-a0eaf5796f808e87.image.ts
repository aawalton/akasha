import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA0eaf5796f808e87 = {
  id: "01a0c5f3-690e-75e5-b3d3-49c1b1ec8848",
  type: "page-type/image",
  slug: "image-a0eaf5796f808e87",
  persona: "persona/elaine",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a beautiful petite young woman with slim curves, long flowing brunette hair, very fair porcelain skin, striking clear blue eyes, vain and confident, a delighted knowing smile with warmth and allure aimed right at the viewer, wearing a dress made entirely of LIVING FLAME — the gown itself formed from swirling orange, gold and crimson fire and glowing embers clinging to her figure, fire-adjacent palette, warm golden dawn radiance, cinematic lighting, ultra detailed, sharp focus, no bird, confident preening stance, chin slightly up, dramatic crimson-and-ember flame dress, NO wings, dark warm background",
  seed: 1675289186,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
