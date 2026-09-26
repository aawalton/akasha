import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF09a41e661e36507 = {
  id: "019f1838-925a-7266-be64-ccc718d01347",
  type: "page-type/image",
  slug: "image-f09a41e661e36507",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic portrait of a stunningly beautiful draconic woman, a red dragon in humanoid form: a refined mature human face with sharp elegant features and subtle draconic traits, long sweeping black-and-gold horns, intense warm amber eyes with vertical slit pupils, iridescent crimson-and-gold scales along her cheekbones and bare shoulders, dark auburn hair swept up. A commanding dungeon master resting one clawed-tipped hand on a polished dragon-engraved dice set, candlelit table, wearing a rich off-shoulder oxblood gown, a slow dominant knowing smile, direct confident eye contact, chest-up intimate framing, warm candlelight, 85mm, photoreal, natural skin detail",
  seed: 8005,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
