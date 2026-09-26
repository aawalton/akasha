import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image4b05a8c9d314e1ad = {
  id: "01a0c5f3-2541-7ab0-a90b-c4e35583fe51",
  type: "page-type/image",
  slug: "image-4b05a8c9d314e1ad",
  persona: "persona/ali",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic CGI close-up portrait of a young fae woman, head and shoulders, the soft delicate face of a youthful kpop idol, very large wide-set eyes with unusually large glowing golden-amber irises and big pupils, smooth fair pale skin, small nose, soft lips, shy gentle smile, like a live-action movie elf, long pointed elf ears, dramatically voluminous wispy feathered layered hair mostly deep emerald-green transitioning into shimmering gold only at the feathered tips, individual feathered strands catching light, garment of dark green foliage at the shoulders, dark enchanted forest bokeh, soft cinematic rim light, 105mm, shallow depth of field, photorealistic",
  seed: 1045,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
