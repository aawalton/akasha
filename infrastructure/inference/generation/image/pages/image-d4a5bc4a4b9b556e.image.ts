import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD4a5bc4a4b9b556e = {
  id: "01a0c5f3-2541-7d27-b9ae-73e3b5be8ad0",
  type: "page-type/image",
  slug: "image-d4a5bc4a4b9b556e",
  persona: "persona/ali",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic CGI render of a young fae woman, the soft delicate face of a youthful kpop idol, very large wide-set eyes with unusually large glowing golden-amber irises and big pupils, smooth fair pale skin, small nose, soft lips, shy gentle smile, slim petite idol figure, like a live-action movie elf, long pointed elf ears, dramatically voluminous wispy feathered layered hair in a flowing ombre gradient from deep emerald-green roots into shimmering gold feathered tips, individual feathered strands catching light, garment of dark green foliage, dark enchanted forest bokeh, cinematic soft lighting, 85mm, shallow depth of field, photorealistic",
  seed: 1035,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
