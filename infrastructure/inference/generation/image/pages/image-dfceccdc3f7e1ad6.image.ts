import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDfceccdc3f7e1ad6 = {
  id: "019f2029-eb27-7293-b488-40b4496cd105",
  type: "page-type/image",
  slug: "image-dfceccdc3f7e1ad6",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic intimate portrait photograph of a beautiful young elf woman, 19 years old, youthful soft delicate features, long silver-blonde hair slightly damp, pale luminous glistening skin, delicate pointed ears, sultry half-lidded bedroom eyes AND a playful teasing smile, glancing back over her shoulder, sensual arch of the back, wearing a small pale bikini, warm soft intimate lighting, seductive and inviting and playful all at once, detailed skin texture, sharp focus, cinematic, photoreal not painterly",
  seed: 313,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
