import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8712ecac220c48b9 = {
  id: "019f57e4-eb44-75ad-b3e1-3a0ff4f87e71",
  type: "page-type/image",
  slug: "image-8712ecac220c48b9",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "striking androgynous woman wearing an oversized charcoal blazer with nothing beneath, hands in pockets, unbothered stare, minimalist loft daylight, photorealistic photograph, natural skin texture, film grain",
  seed: 1790106371,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
