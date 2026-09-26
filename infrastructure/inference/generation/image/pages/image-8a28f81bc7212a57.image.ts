import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8a28f81bc7212a57 = {
  id: "01a0c5f3-2541-7b6a-8f6e-83f50945bc3b",
  type: "page-type/image",
  slug: "image-8a28f81bc7212a57",
  persona: "persona/ali",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic CGI render of a young fae woman with the soft delicate face of a youthful kpop idol, very large wide-set eyes with unusually large glowing golden-amber irises and big pupils, smooth fair pale skin, small nose, soft lips, shy gentle smile, slim petite idol figure, like a live-action movie elf, long pointed elf ears, elaborately styled poofy voluminous feathered hair in a smooth ombre gradient from emerald-green roots flowing into bright golden ends, garment of dark green foliage, dark enchanted forest bokeh, cinematic soft lighting, 85mm, shallow depth of field, photorealistic",
  seed: 1031,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
