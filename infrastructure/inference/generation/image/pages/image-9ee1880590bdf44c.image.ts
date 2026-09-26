import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9ee1880590bdf44c = {
  id: "01a0c5f3-8d0f-741d-bf58-6818ece1d727",
  type: "page-type/image",
  slug: "image-9ee1880590bdf44c",
  grade: "A",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Elegant woman astronomer in a candlelit stone observatory tower, wearing an open midnight-blue robe embroidered with constellations over a thin linen shift, brass orrery and charts around her, one hand on a great telescope, looking back over her shoulder at the viewer, dozens of candles and a shaft of cold moonlight through the open dome, painterly fantasy realism\n",
  seed: 616833980,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
