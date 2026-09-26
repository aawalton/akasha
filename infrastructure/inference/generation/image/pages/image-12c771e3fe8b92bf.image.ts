import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image12c771e3fe8b92bf = {
  id: "019f1838-8ade-72ec-bdc1-404c981363a3",
  type: "page-type/image",
  slug: "image-12c771e3fe8b92bf",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic tight head-and-shoulders portrait of a stunningly beautiful draconic woman, a red dragon in humanoid form: a smooth human face with subtle draconic features, elegant black horns curving back from her brow, warm amber eyes with vertical slit pupils, a delicate scattering of iridescent crimson-and-gold scales along her cheekbones and jaw, long dark red hair framing her face, a warm inviting confident knowing smile, direct eye contact, soft warm candlelight, shallow depth of field, 85mm, photoreal, natural skin detail",
  seed: 8004,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
