import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image81b228e9a55ef479 = {
  id: "01a0c5f3-2541-7e9c-8467-da57d48c06c9",
  type: "page-type/image",
  slug: "image-81b228e9a55ef479",
  persona: "persona/ali",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic CGI render of a young winged fae woman, translucent iridescent fae wings, the soft delicate face of a youthful kpop idol, very large wide-set eyes with unusually large glowing golden-amber irises and big pupils, smooth fair pale skin, slim petite figure, like a live-action movie elf, long pointed elf ears, long wild voluminous emerald-green hair, sweet innocent expression, garment of dark green foliage, dark enchanted forest with soft glow, cinematic lighting, 85mm, shallow depth of field, photorealistic",
  seed: 1015,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
