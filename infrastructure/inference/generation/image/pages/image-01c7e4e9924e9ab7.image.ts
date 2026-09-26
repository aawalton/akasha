import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image01c7e4e9924e9ab7 = {
  id: "019f1838-9579-743a-984f-b85b0029e4af",
  type: "page-type/image",
  slug: "image-01c7e4e9924e9ab7",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a stunningly beautiful draconic woman, a silver dragon in humanoid form, warm devoted and seductive: smooth flawless skin, a delicate very subtle barely-there scattering of fine iridescent silver scales only on the tops of her cheekbones, smooth bare arms no scales, normal smooth bare human ears no scales, smooth polished translucent faceted crystal silver horns gleaming like cut gemstone, luminous pale silver-blue slit-pupil eyes, long platinum silver-white hair. She wears an elegant off-shoulder deep sapphire-blue silk gown with a polished silver chainmail bodice, completely bare open neck and no collar, elegant silver armlets on her smooth bare arms no scales. In a misty moonlit ancient forest, soft shafts of moonlight, a soft inviting affectionate seductive smile, looking directly at the viewer, chest-up framing, 85mm, photoreal, natural skin detail, cool atmospheric light",
  seed: 8703,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
