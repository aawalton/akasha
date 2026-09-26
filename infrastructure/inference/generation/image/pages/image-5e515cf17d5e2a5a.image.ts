import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5e515cf17d5e2a5a = {
  id: "01a0c5f3-7a9c-7aa2-a4d6-855a9dc6d7c7",
  type: "page-type/image",
  slug: "image-5e515cf17d5e2a5a",
  grade: "A-",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "a young fictional Korean kpop idol woman sunbathing, lying on her back on a checkered picnic blanket spread over green grass, wearing a sheer white lace shirt over a bikini bottom, a straw sun hat resting beside her, bright clear midday sunlight, full body, 35mm photo, shallow depth of field, visible skin texture, natural color, photorealistic",
  seed: 902674037,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
