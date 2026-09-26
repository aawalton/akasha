import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0d47eabfca6ecc6d = {
  id: "01a0c5f3-2541-7b3f-8e65-f1ba700092ec",
  type: "page-type/image",
  slug: "image-0d47eabfca6ecc6d",
  persona: "persona/ali",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic CGI render of a young fae woman, the soft delicate face of a youthful kpop idol, very large wide-set eyes with unusually large glowing golden-amber irises and big pupils, smooth fair pale skin, small nose, soft lips, shy gentle smile, slim petite idol figure, like a live-action movie elf, long pointed elf ears, elaborately styled poofy voluminous flowing layered hair mostly deep emerald-green transitioning into shimmering gold only at the very tips, soft silky strands catching light, soft natural hair texture not feathers, garment of dark green foliage, dark enchanted forest bokeh, cinematic soft lighting, 85mm, shallow depth of field, photorealistic",
  seed: 1054,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
