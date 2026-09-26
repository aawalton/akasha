import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0f77af8128fa6cf3 = {
  id: "01a0c5f3-8d0f-757e-ae13-11ef60be8bcc",
  type: "page-type/image",
  slug: "image-0f77af8128fa6cf3",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Stunning young woman in her early twenties in a rain-lashed cyberpunk apartment at night, wearing a sheer iridescent slip that shifts colour and thin glowing straps, wet-look dark hair, sitting on the window ledge with one knee drawn up, looking directly at the viewer with a cool challenge, magenta and cyan neon through streaming glass lighting her skin, painterly science fiction realism\n",
  seed: 1799578276,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
