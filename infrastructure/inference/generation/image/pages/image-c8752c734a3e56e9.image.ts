import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC8752c734a3e56e9 = {
  id: "01a0c5f3-2541-7214-93a9-b046a2d03c77",
  type: "page-type/image",
  slug: "image-c8752c734a3e56e9",
  persona: "persona/ali",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic CGI render of a fae mage, like a live-action movie elf, long pointed elf ears, fair pale skin, intense glowing golden-amber eyes with direct eye contact, long wild emerald-green hair lifting in magical wind, determined expression, garment of dark green foliage, dark dramatic background, cinematic magical lighting, 85mm, photorealistic",
  seed: 1006,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
