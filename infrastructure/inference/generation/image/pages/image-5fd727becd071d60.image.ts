import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5fd727becd071d60 = {
  id: "01a0c5f3-2541-7053-b172-300313dc356e",
  type: "page-type/image",
  slug: "image-5fd727becd071d60",
  persona: "persona/ali",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic CGI render of a young fae woman with golden backlight glowing through her hair, the soft youthful face of a kpop idol, very large wide-set eyes with unusually large luminous golden-amber irises and oversized pupils, flawless fair pale skin, small delicate nose, soft lips, shy gentle smile, slim petite figure, like a live-action movie elf, long pointed elf ears, elaborately styled poofy voluminous emerald-green hair with shimmering gold tips lit from behind, garment of dark green foliage, dark background with warm golden rim light, cinematic, 85mm, shallow depth of field, photorealistic",
  seed: 1024,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
