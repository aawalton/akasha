import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0d6e31170226c151 = {
  id: "019f1836-d888-7e22-910c-78405c1485e3",
  type: "page-type/image",
  slug: "image-0d6e31170226c151",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying an anime mecha pilot, sleek skintight pilot suit with glowing lines, futuristic cockpit backdrop, determined expression, cool blue light, 35mm, detailed costume, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
