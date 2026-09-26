import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image12af11c91e7a7c86 = {
  id: "01a0c5f3-9f6f-73cc-9101-96af17d230d1",
  type: "page-type/image",
  slug: "image-12af11c91e7a7c86",
  grade: "B+",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Gorgeous dark-haired woman in a red silk evening gown with a deep back, standing at a hotel window at dusk, city lights bokeh behind her, looking over her shoulder, elegant collarbones, glossy hair, cinematic glamour photography, warm rim light\n",
  seed: 1275194417,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
