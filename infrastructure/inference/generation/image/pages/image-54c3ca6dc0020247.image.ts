import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image54c3ca6dc0020247 = {
  id: "01a0c5f3-2541-77c3-9740-1ef4e8b7f17e",
  type: "page-type/image",
  slug: "image-54c3ca6dc0020247",
  persona: "persona/ali",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic CGI render of a young fae woman with the soft delicate face of a youthful kpop idol, very large wide-set eyes with unusually large glowing golden-amber irises and big pupils, smooth fair pale skin, small nose, soft lips, shy gentle smile, slim petite idol figure, like a live-action movie elf, long pointed elf ears, elaborately styled poofy voluminous emerald-green hair with shimmering gold tips, garment of dark green foliage, dark enchanted forest bokeh, cinematic soft lighting, 85mm, shallow depth of field, photorealistic",
  seed: 1021,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
