import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image07a81dc93ca4aff0 = {
  id: "019f581d-bbc0-7d6b-a5bf-1a74ed52627b",
  type: "page-type/image",
  slug: "image-07a81dc93ca4aff0",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "cocky grease-smudged woman in coveralls unzipped to the waist over a white tank, wrench over her shoulder, sunlit garage, photorealistic photograph, natural skin texture, film grain",
  seed: 77996800,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
