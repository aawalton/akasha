import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0c31996144e94fb3 = {
  id: "01a0c5f3-7a9c-7222-80ad-c6f65a7baa42",
  type: "page-type/image",
  slug: "image-0c31996144e94fb3",
  grade: "S-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Gorgeous woman on a Venetian balcony in warm night rain, wet emerald silk gown clinging from shoulder to ankle, hair soaked and slicked back, one hand on the stone balustrade, looking directly at the viewer with parted lips, candlelight spilling from the room behind her and rain lit like sparks, painterly fantasy realism, opulent and glistening\n",
  seed: 1642639831,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
