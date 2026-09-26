import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3030683a8a85f0aa = {
  id: "01a0c5f2-eb21-7d51-af30-1c3b77b1da78",
  type: "page-type/image",
  slug: "image-3030683a8a85f0aa",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman relaxing in a hot tub in a swimsuit, shoulders above steamy water, soft evening light, calm intimate gaze toward the viewer, 50mm, soft warm glow, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
