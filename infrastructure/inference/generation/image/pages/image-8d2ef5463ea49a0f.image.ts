import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8d2ef5463ea49a0f = {
  id: "019f1838-8885-78ab-82e5-259c326f8b59",
  type: "page-type/image",
  slug: "image-8d2ef5463ea49a0f",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a stunningly beautiful draconic woman, a red dragon in humanoid form: smooth flawless human skin with a delicate very subtle barely-there scattering of fine iridescent crimson-gold scales lightly tracing only the tops of her cheekbones, clean smooth arms with no scales. Her ears are normal smooth bare human ears, completely smooth with absolutely no scales, fins, or armor on or near her ears. Smooth solid polished black-and-gold horns (completely smooth, NOT scaled), warm amber eyes with vertical slit pupils, long dark red hair. She wears symmetric matched dragon-scale armor on BOTH shoulders: a scaled pauldron on each shoulder (a matching pair), scaled gauntlets on both forearms, and a fitted scaled chestplate of polished overlapping crimson-and-gold scales. A dungeon master at a candlelit table with dice and an open rulebook, a sly warm knowing smile, looking directly at the viewer, chest-up framing, warm candlelight, 85mm, photoreal, natural skin detail",
  seed: 8022,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
