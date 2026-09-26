import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image070bf8d73e5b7fc7 = {
  id: "019f1838-894f-77e7-a30a-23370bb58d16",
  type: "page-type/image",
  slug: "image-070bf8d73e5b7fc7",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a stunningly beautiful young draconic woman, a red dragon in humanoid form: a fresh youthful human face with playful features and subtle draconic traits, short curved crimson horns, bright warm amber eyes with vertical slit pupils, a light scattering of crimson-and-gold scales on her cheekbones, tousled dark red hair. A mischievous dungeon master leaning forward with one elbow propped on a candlelit wooden gaming table, holding a few dice raised in one hand near her face, an open leather rulebook and scattered parchment maps on the table, wearing an off-shoulder crimson tunic, a teasing smirk and one raised eyebrow as if daring the viewer, sparkling playful eyes, direct eye contact, chest-up intimate framing, warm candlelight, 85mm, photoreal, natural skin detail",
  seed: 8006,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
