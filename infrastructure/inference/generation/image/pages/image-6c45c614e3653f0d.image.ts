import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6c45c614e3653f0d = {
  id: "019f1838-94a8-78fa-bde8-023f2806137e",
  type: "page-type/image",
  slug: "image-6c45c614e3653f0d",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a stunningly beautiful draconic woman, a red dragon in humanoid form: smooth flawless human skin with NO scales on her face or arms, subtle draconic features only — elegant black-and-gold horns sweeping back from her brow, captivating warm amber eyes with vertical slit pupils, long dark red hair. She wears gleaming crimson-and-gold metal scale-mail armor: overlapping polished metal scales forming an ornate shoulder cape and chest harness, chainmail rings and fine draping chains, a high scalloped collar. A dungeon master at a candlelit table with polished dice and an open leather rulebook, a sly warm knowing smile, looking directly at the viewer with playful confidence, chest-up intimate framing, warm candlelight, shallow depth of field, 85mm, photoreal, natural skin detail",
  seed: 8010,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
