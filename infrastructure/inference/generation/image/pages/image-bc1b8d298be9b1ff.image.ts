import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBc1b8d298be9b1ff = {
  id: "01a0c5f3-2541-7880-9dfe-2e2a7f23913f",
  type: "page-type/image",
  slug: "image-bc1b8d298be9b1ff",
  persona: "persona/ali",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic CGI render of a young fae woman with golden backlight glowing through her hair, the soft youthful face of a kpop idol, very large wide-set eyes with unusually large luminous golden-amber irises and oversized pupils, flawless fair pale skin, small delicate nose, soft lips, slim petite figure, like a live-action movie elf, long pointed elf ears, long wild voluminous bright emerald-green hair lit from behind, gentle expression looking at the viewer, garment of dark green foliage, dark background with warm golden rim light, cinematic, 85mm, shallow depth of field, photorealistic",
  seed: 1016,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
