import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFdf2f8732919d53c = {
  id: "019f1838-97c3-7af6-a989-c145ee27f0d7",
  type: "page-type/image",
  slug: "image-fdf2f8732919d53c",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a stunningly beautiful draconic woman, a silver dragon in humanoid form: smooth flawless skin, a delicate very subtle barely-there scattering of fine iridescent silver scales only on the tops of her cheekbones, smooth bare arms no scales, normal smooth bare human ears no scales, elegant dark gunmetal silver natural ridged dragon horns sweeping gracefully back, luminous deep sapphire-blue slit-pupil eyes, long platinum silver-white hair, large elegant silver dragon wings framing softly behind her. She wears an off-shoulder deep sapphire-blue silk gown with a silver chainmail bodice, bare open neck. In her opulent treasure lair, a soft seductive smile, warm firelight, looking directly at the viewer, chest-up framing, 85mm, photoreal, natural skin detail",
  seed: 8733,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
