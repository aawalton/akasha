import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE6c92dc585d1af2e = {
  id: "01a0c5f3-2541-7777-abc0-75dcef828b64",
  type: "page-type/image",
  slug: "image-e6c92dc585d1af2e",
  persona: "persona/ali",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic CGI render of a young fae woman, the soft delicate face of a youthful kpop idol, very large wide-set eyes with unusually large glowing golden-amber irises and big pupils, smooth fair pale skin, small nose, soft lips, shy gentle smile, slim petite idol figure, like a live-action movie elf, long pointed elf ears, enormously voluminous poofy wispy feathered layered hair mostly deep emerald-green transitioning into shimmering gold only at the feathered tips, individual feathered strands catching light, garment of dark green foliage, dark enchanted forest bokeh, cinematic soft lighting, 85mm, shallow depth of field, photorealistic",
  seed: 1046,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
