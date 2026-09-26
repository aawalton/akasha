import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCd1838239d2b94b2 = {
  id: "01a0c5f3-b3cb-7fc0-8f0f-b264090171da",
  type: "page-type/image",
  slug: "image-cd1838239d2b94b2",
  grade: "B",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Beautiful woman in a Belle Epoque opera box, sheer black lace over pale shoulders and an emerald velvet gown, opera glasses lowered in one gloved hand, turning from the balcony to look directly at the viewer with a private smile, gilt carving and red plush around her, warm gaslight and the bright stage glow beyond, painterly realism, opulent\n",
  seed: 1034924569,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
