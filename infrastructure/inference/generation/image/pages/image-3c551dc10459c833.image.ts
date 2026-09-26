import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3c551dc10459c833 = {
  id: "01a0c5f3-2541-753c-ae53-3aa1e3fa118e",
  type: "page-type/image",
  slug: "image-3c551dc10459c833",
  persona: "persona/ali",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "photorealistic CGI render of a tiny fae woman in flight, translucent iridescent fae wings catching golden light, like a live-action movie elf, long pointed elf ears, fair pale skin, glowing golden-amber eyes with direct eye contact, long wild voluminous emerald-green hair streaming behind her, garment of dark green foliage, dark enchanted library with floating books, cinematic magical glow, 85mm, photorealistic",
  seed: 1004,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
