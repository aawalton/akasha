import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image77fe7a97a9380020 = {
  id: "019f57f4-944a-7c6f-9f08-34b2f3fde23b",
  type: "page-type/image",
  slug: "image-77fe7a97a9380020",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "knowing mermaid with an iridescent scaled tail and shell jewelry reclined on a sea rock wringing out wet hair, crashing turquoise surf, photorealistic photograph, natural skin texture, film grain",
  seed: 2023238118,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
