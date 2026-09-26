import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image80f325050088b438 = {
  id: "019f1838-8f89-703a-a034-37d32e32ab11",
  type: "page-type/image",
  slug: "image-80f325050088b438",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a stunningly beautiful young East Asian draconic woman, a red dragon in humanoid form, with elegant East Asian features and large wide-set expressive almond eyes: smooth flawless skin, a fresh youthful playful face, short curved crimson horns, bright warm amber eyes with vertical slit pupils, a light scattering of crimson-and-gold scales only on her cheekbones, long tousled dark red hair. A mischievous dungeon master leaning forward with one elbow propped on a candlelit wooden gaming table, holding a die raised in her fingers near her face, an open leather rulebook and scattered parchment maps on the table, wearing an off-shoulder soft crimson tunic, a teasing smirk and one raised eyebrow as if daring the viewer, sparkling playful eyes, direct eye contact, chest-up intimate framing, warm candlelight, 85mm, photoreal, natural skin detail",
  seed: 8300,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
