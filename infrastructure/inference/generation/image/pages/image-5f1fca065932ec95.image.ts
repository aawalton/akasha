import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5f1fca065932ec95 = {
  id: "019f1838-8a7d-782c-b5c2-58df61406007",
  type: "page-type/image",
  slug: "image-5f1fca065932ec95",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a stunningly beautiful draconic woman, a red dragon in humanoid form: smooth flawless human skin, normal smooth ears with no scales near them, subtle draconic features only — smooth solid polished black-and-gold horns (completely smooth, NOT scaled) sweeping back from her brow, captivating warm amber eyes with vertical slit pupils, long dark red hair. She wears gleaming crimson-and-gold dragon-scale armor: scaled pauldrons over her shoulders, scaled gauntlets on her forearms, and a fitted scaled chestplate of polished overlapping metal scales. A dungeon master at a candlelit table with polished dice and an open leather rulebook, a sly warm knowing smile, looking directly at the viewer with playful confidence, chest-up intimate framing, warm candlelight, shallow depth of field, 85mm, photoreal, natural skin detail",
  seed: 8020,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
