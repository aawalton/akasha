import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEa3e28bb56350079 = {
  id: "019f1838-9129-7a6d-80b3-fb862b9b4215",
  type: "page-type/image",
  slug: "image-ea3e28bb56350079",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a stunningly beautiful draconic woman, a green dragon in humanoid form: a smooth human face with subtle draconic features, sleek dark horns curving back, luminous golden eyes with vertical slit pupils, iridescent emerald-and-jade scales tracing her cheekbones and bare shoulders, long sleek dark hair. A dungeon master at a candlelit gaming table with dice and painted miniatures, wearing a deep emerald-and-gold corset gown, a slow sultry knowing half-smile, looking at the viewer through her lashes, chest-up intimate framing, warm candlelight, shallow depth of field, 85mm, photoreal, natural skin detail",
  seed: 8002,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
