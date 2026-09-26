import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0d5c64026154c055 = {
  id: "019f1838-8a78-7b48-a982-be69e583d02b",
  type: "page-type/image",
  slug: "image-0d5c64026154c055",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a stunningly beautiful draconic woman, a violet dragon in humanoid form: a smooth human face with subtle draconic features, elegant silver horns curving back, luminous violet eyes with vertical slit pupils, amethyst scales tracing her temples and collarbone, long silver-white hair. A dungeon master seated at a table lit by glowing purple arcane candles and softly floating runes, wearing a plunging dark amethyst robe, a mysterious composed knowing smile, sensual and self-possessed, looking directly at the viewer, chest-up intimate framing, warm arcane candlelight, shallow depth of field, 85mm, photoreal, natural skin detail",
  seed: 8003,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
