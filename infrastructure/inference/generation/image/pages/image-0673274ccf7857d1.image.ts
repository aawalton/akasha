import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0673274ccf7857d1 = {
  id: "01a0c5f2-eb1f-7e02-b5a1-c43db302f757",
  type: "page-type/image",
  slug: "image-0673274ccf7857d1",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman mid kettlebell swing in a gym, athletic wear, dynamic powerful posture, determined expression, moody industrial gym light, 35mm, action shot, photoreal",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
