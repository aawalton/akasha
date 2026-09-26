import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCc7d1420f3232d65 = {
  id: "01a0c5f2-eb24-7adb-a82e-9df45ef73dfb",
  type: "page-type/image",
  slug: "image-cc7d1420f3232d65",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a short silk chemise standing by a bright window, soft backlight glowing through the fabric, one hand on the curtain, calm intimate expression, 50mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
