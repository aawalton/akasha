import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image53efde1641a98fee = {
  id: "019f1838-9515-73f4-a933-e30108f9a320",
  type: "page-type/image",
  slug: "image-53efde1641a98fee",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a stunningly beautiful draconic woman, a red dragon in humanoid form: smooth flawless human skin with a delicate very subtle barely-there scattering of fine iridescent crimson-gold scales lightly tracing only the tops of her cheekbones, clean smooth arms. Her ears are normal smooth bare human ears with no scales. Smooth solid polished black-and-gold horns, warm amber eyes with vertical slit pupils, long dark red hair. She wears a chainmail chestplate of fine interlocking metal rings. A dungeon master at a candlelit table with dice and an open rulebook, a sly warm knowing smile, looking directly at the viewer, chest-up framing, warm candlelight, 85mm, photoreal, natural skin detail",
  seed: 8050,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
