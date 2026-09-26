import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6acd8cbb824e65b4 = {
  id: "01a0c5f2-eb21-71b2-bce2-ab6978dcf113",
  type: "page-type/image",
  slug: "image-6acd8cbb824e65b4",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman at a Dubai rooftop with the futuristic skyline behind, casual chic outfit, warm dusk light, confident smile toward the viewer, 35mm, travel photo, visible skin texture, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
