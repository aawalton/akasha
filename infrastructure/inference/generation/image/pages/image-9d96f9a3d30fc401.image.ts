import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9d96f9a3d30fc401 = {
  id: "01a0c5f3-7a9c-7034-ab8e-816ef4226fa8",
  type: "page-type/image",
  slug: "image-9d96f9a3d30fc401",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "mischievous woman in an oversized unbuttoned white dress shirt and black stockings, walking down a hallway toward camera, morning apartment light, photorealistic photograph, natural skin texture, film grain",
  seed: 2115627591,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
