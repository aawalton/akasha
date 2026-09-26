import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image258f9a8c879779b6 = {
  id: "01a0c5f2-eb23-7508-bad2-b8327568b3c9",
  type: "page-type/image",
  slug: "image-258f9a8c879779b6",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman cosplaying a steampunk adventurer, brass goggles, leather corset and gears, Victorian industrial backdrop, confident expression, warm sepia light, 50mm, detailed costume, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
