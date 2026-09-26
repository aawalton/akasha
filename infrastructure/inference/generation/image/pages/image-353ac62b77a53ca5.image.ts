import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image353ac62b77a53ca5 = {
  id: "01a0c5f3-f003-7539-b3f7-880c01eff806",
  type: "page-type/image",
  slug: "image-353ac62b77a53ca5",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "two women in their twenties lying on striped beach towels tanning on a sandy beach, swimsuits and sun hats, clear blue sky, candid documentary photograph, warm golden sunlight, depth of field",
  seed: 406843428,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
