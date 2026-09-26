import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB1e2ab7f1f3747b9 = {
  id: "01a0c5f3-b3c9-7ec9-aaa1-bc3d8c9c2d64",
  type: "page-type/image",
  slug: "image-b1e2ab7f1f3747b9",
  grade: "B-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young woman street busker cellist, wavy chestnut hair, bohemian layered clothing, fingerless gloves, playing cello on a city sidewalk, gentle natural overcast daylight, candid expression, 85mm portrait, shallow depth of field, visible skin texture, photoreal",
  seed: 895200151,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
