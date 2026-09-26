import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image452c41882b4d38cd = {
  id: "019f28c7-04cd-71b7-8804-d012b0422f2d",
  type: "page-type/image",
  slug: "image-452c41882b4d38cd",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait photograph, head and shoulders to chest, of a petite young woman in her mid-twenties leaning back against warm stone at golden hour, head tipped slightly, listening to the ground. Long black hair loose over one shoulder, wisps across her face. Blind eyes open: milky white clouded irises, luminous and unfocused, beautiful rather than unsettling. Composed still expression with the faintest knowing at the mouth's corner. Cream linen wrap slipping off one shoulder, terracotta tones. Golden light, stone and dry grass bokeh, natural skin texture, 85mm lens, photoreal.",
  seed: 6310,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
