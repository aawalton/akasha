import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageFb419057e260160e = {
  id: "01a0c5f3-2541-7f90-a675-0fb59f49db3a",
  type: "page-type/image",
  slug: "image-fb419057e260160e",
  persona: "persona/ali",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic CGI close-up portrait of a young fae woman, head and shoulders, the soft youthful face of a kpop idol, very large wide-set eyes with unusually large glowing golden-amber irises and oversized pupils, flawless fair pale skin, small delicate nose, soft pink lips, shy gentle smile, like a live-action movie elf, long pointed elf ears, elaborately styled poofy voluminous emerald-green hair with glittering gold tips, garment of dark green foliage at the shoulders, dark forest bokeh, soft cinematic rim light, 105mm, shallow depth of field, photorealistic",
  seed: 1022,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
