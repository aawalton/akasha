import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image95d3d44663c25c05 = {
  id: "019f1838-8d36-7ff6-ba0e-80fc791397bd",
  type: "page-type/image",
  slug: "image-95d3d44663c25c05",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a stunningly beautiful draconic woman, a silver dragon in humanoid form, warm compassionate and devoted: smooth flawless human skin with a delicate very subtle barely-there scattering of fine iridescent silver scales lightly tracing only the tops of her cheekbones, clean smooth arms. Her ears are normal smooth bare human ears with no scales. Smooth solid polished silver horns, luminous pale silver-blue eyes with vertical slit pupils, long platinum silver-white hair. She wears a chainmail chestplate of fine interlocking metal rings. A warm devoted dungeon master at a candlelit table with dice and an open rulebook, a soft inviting affectionate seductive smile, looking directly at the viewer, chest-up framing, warm candlelight, 85mm, photoreal, natural skin detail",
  seed: 8051,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
