import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEb59ce1aa756a1f0 = {
  id: "019f57f9-e251-7b11-b21e-08541e3fe2b9",
  type: "page-type/image",
  slug: "image-eb59ce1aa756a1f0",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "passionate woman in a ruffled red flamenco dress mid-stomp with arms coiled high, Sevilla courtyard under lantern light, photorealistic photograph, natural skin texture, film grain",
  seed: 1026176805,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
