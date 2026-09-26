import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3ff26b125f9fce1e = {
  id: "01a0c5f2-eb1f-7db4-9c09-a7a25849304e",
  type: "page-type/image",
  slug: "image-3ff26b125f9fce1e",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman on an arcade date, casual graphic tee and denim, leaning on an arcade machine, playful grin toward the viewer, colorful neon glow, 35mm, candid, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
