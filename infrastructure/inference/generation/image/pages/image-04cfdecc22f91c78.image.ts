import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image04cfdecc22f91c78 = {
  id: "019f5800-9b89-7748-a39b-e7b45671f700",
  type: "page-type/image",
  slug: "image-04cfdecc22f91c78",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "storm-eyed woman in fur-trimmed leather with braids and war paint standing at a longship prow, fjord mist, photorealistic photograph, natural skin texture, film grain",
  seed: 2037470959,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
