import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image83f1ca1530d22b8b = {
  id: "01a0c5f3-2541-79e7-b31a-a86a18bf6c8b",
  type: "page-type/image",
  slug: "image-83f1ca1530d22b8b",
  persona: "persona/ali",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic CGI render of a young fae woman with golden backlight glowing through her hair, the soft youthful face of a kpop idol, very large wide-set eyes with unusually large luminous golden-amber irises and oversized pupils, flawless fair pale skin, small delicate nose, soft lips, shy gentle smile, slim petite figure, like a live-action movie elf, long pointed elf ears, poofy voluminous feathered hair in a smooth ombre gradient from emerald-green roots to glowing golden ends, garment of dark green foliage, dark background with warm golden rim light, cinematic, 85mm, shallow depth of field, photorealistic",
  seed: 1033,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
