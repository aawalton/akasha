import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image29bc664fa3e3c0ab = {
  id: "01a0c5f3-2541-70aa-a62d-5564697131b8",
  type: "page-type/image",
  slug: "image-29bc664fa3e3c0ab",
  persona: "persona/ali",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic CGI render of a young fae woman, the soft delicate face of a youthful kpop idol, very large wide-set eyes with unusually large glowing golden-amber irises and big pupils, smooth fair pale skin, small nose, soft lips, shy gentle smile, slim petite idol figure, like a live-action movie elf, long pointed elf ears, elaborately styled poofy voluminous emerald-green hair with intricate braids and twists and gold tips, garment of dark green foliage, dark enchanted forest bokeh, cinematic soft lighting, 85mm, shallow depth of field, photorealistic",
  seed: 1025,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
