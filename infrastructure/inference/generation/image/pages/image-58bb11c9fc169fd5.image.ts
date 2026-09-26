import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image58bb11c9fc169fd5 = {
  id: "01a0c5f2-eb1f-7cbc-8a33-6a3aaf27bbab",
  type: "page-type/image",
  slug: "image-58bb11c9fc169fd5",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman on an evening city date, casual jacket and jeans, walking a lamplit street, glancing back with a soft smile, warm streetlight glow and bokeh, 35mm, candid, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
