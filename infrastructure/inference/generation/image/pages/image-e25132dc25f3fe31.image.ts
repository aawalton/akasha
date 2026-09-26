import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE25132dc25f3fe31 = {
  id: "01a0c5f2-eb24-7308-a2bd-4c98ace44d27",
  type: "page-type/image",
  slug: "image-e25132dc25f3fe31",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman stretching her arms up beside the bed in the morning, backlit by a bright window, soft silhouette glow, relaxed sleepy posture, 50mm, soft natural light, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
