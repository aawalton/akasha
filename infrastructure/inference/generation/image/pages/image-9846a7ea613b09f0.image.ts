import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9846a7ea613b09f0 = {
  id: "01a0c5f3-2541-7efb-a8ac-eb4d3b4ac88a",
  type: "page-type/image",
  slug: "image-9846a7ea613b09f0",
  persona: "persona/ali",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic CGI render of a young fae woman with the soft delicate face of a youthful kpop idol, very large wide-set eyes with unusually large glowing golden-amber irises and big pupils, smooth fair pale skin, small nose, soft lips, slim petite idol figure, like a live-action movie elf, long pointed elf ears, long wild voluminous emerald-green hair, gentle innocent expression looking at the viewer, garment of dark green foliage, dark enchanted forest bokeh, cinematic soft lighting, 85mm, shallow depth of field, photorealistic",
  seed: 1011,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
