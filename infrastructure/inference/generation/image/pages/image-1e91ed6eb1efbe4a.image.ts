import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1e91ed6eb1efbe4a = {
  id: "01a0c5f2-eb25-78c0-82cf-e453999a2e99",
  type: "page-type/image",
  slug: "image-1e91ed6eb1efbe4a",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman in a sheer flowing robe over lingerie standing at a rain-streaked window, soft gray daylight, contemplative gaze, fabric drifting in the light, 50mm, shallow depth of field, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
