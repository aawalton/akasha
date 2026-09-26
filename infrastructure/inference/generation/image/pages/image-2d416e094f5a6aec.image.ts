import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2d416e094f5a6aec = {
  id: "01a0c5f3-2541-7065-a530-5c0c6ac78661",
  type: "page-type/image",
  slug: "image-2d416e094f5a6aec",
  persona: "persona/ali",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic CGI render of a young fae sorceress with the soft delicate face of a youthful kpop idol, very large wide-set eyes with unusually large glowing golden-amber irises and big pupils, smooth fair pale skin, slim petite idol figure, like a live-action movie elf, long pointed elf ears, long wild voluminous emerald-green hair, wearing a long flowing pale frostweave mage robe trailing snow and ice crystals, holding a glowing quartz wand, soft innocent expression, wintry enchanted forest, cinematic magical lighting, 85mm, photorealistic",
  seed: 1013,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
