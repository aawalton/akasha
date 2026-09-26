import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image57d6b675bb55103a = {
  id: "01a0c5f3-8d0e-73cc-8e24-983fa5109b91",
  type: "page-type/image",
  slug: "image-57d6b675bb55103a",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "otherworldly woman in an ethereal silver silk elven gown and leaf circlet, fingertips grazing an ancient tree, misty enchanted forest with light shafts, photorealistic photograph, natural skin texture, film grain",
  seed: 1143288920,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
