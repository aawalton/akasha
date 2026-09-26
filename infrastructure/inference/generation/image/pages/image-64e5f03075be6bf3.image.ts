import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image64e5f03075be6bf3 = {
  id: "01a0c5f3-690f-78bc-bd0f-3e4df455dcff",
  type: "page-type/image",
  slug: "image-64e5f03075be6bf3",
  persona: "persona/elaine",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a beautiful petite young woman with slim curves, long flowing brunette hair, very fair porcelain skin, striking clear blue eyes, vain and confident, a delighted knowing smile with warmth and allure aimed right at the viewer, wearing a dress made entirely of LIVING FLAME — the gown itself formed from swirling orange, gold and crimson fire and glowing embers clinging to her figure, fire-adjacent palette, warm golden dawn radiance, cinematic lighting, ultra detailed, sharp focus, no bird, mid-step bouncy energetic pose, delighted open expression, large luminous fiery seraph wings, soft glowing halo",
  seed: 1798628665,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
