import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image62ce747d5016665b = {
  id: "01a0c5f3-2541-7533-a975-9ed8cd302f06",
  type: "page-type/image",
  slug: "image-62ce747d5016665b",
  persona: "persona/ali",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic CGI render of a young fae woman turned three-quarters toward the camera, the soft youthful face of a kpop idol, very large wide-set eyes with unusually large glowing golden-amber irises and oversized pupils, flawless fair pale skin, small nose, soft lips, shy gentle smile, slim petite figure, like a live-action movie elf, long pointed elf ears, elaborately styled extremely poofy voluminous emerald-green hair with gold tips framing her face, garment of dark green foliage, dark enchanted forest with soft glow, cinematic lighting, 85mm, shallow depth of field, photorealistic",
  seed: 1026,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
