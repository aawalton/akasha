import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF9b779021aa343e7 = {
  id: "019f1839-01b3-774c-b1aa-add822fcf487",
  type: "page-type/image",
  slug: "image-f9b779021aa343e7",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic ethereal portrait of two young women with pale luminous skin and bare shoulders, one platinum-blonde and one soft rose-gold, cheeks nearly touching, serene dreamy connection, soft pastel light, romantic and delicate, natural realistic skin texture, shallow depth of field, highly detailed realism",
  seed: 80170011,
  width: 1216,
  height: 832,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
