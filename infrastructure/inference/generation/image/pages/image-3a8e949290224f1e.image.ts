import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3a8e949290224f1e = {
  id: "019f1838-87d6-7a0f-9d00-c7113e7a0b84",
  type: "page-type/image",
  slug: "image-3a8e949290224f1e",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a stunningly beautiful draconic woman, a red dragon in humanoid form: a smooth human face with subtle draconic features, elegant black horns curving back from her brow, warm amber eyes with vertical slit pupils, a fine scattering of iridescent crimson-and-gold scales tracing her high cheekbones and bare collarbone, long dark red hair. She is a dungeon master leaning over a candlelit tabletop scattered with polished dice and an open leather rulebook, wearing a rich off-the-shoulder crimson robe, a sly knowing warm smile, looking directly at the viewer with playful confidence, chest-up intimate framing, warm candlelight, shallow depth of field, 85mm, photoreal, natural skin detail",
  seed: 8001,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
