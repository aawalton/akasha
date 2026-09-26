import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image720a36007c54c426 = {
  id: "01a0c5f3-f003-7f92-8afe-ff2f6ae9a6bf",
  type: "page-type/image",
  slug: "image-720a36007c54c426",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "three adult female friends in their twenties sitting and lying on a green lawn on a sunny summer afternoon, relaxed summer casual outfits, laughing together, warm golden-hour light, photoreal 35mm lifestyle photograph, lush park background",
  seed: 1796075995,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
