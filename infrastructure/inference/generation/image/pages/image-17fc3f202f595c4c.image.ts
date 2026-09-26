import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image17fc3f202f595c4c = {
  id: "01a0c5f3-db28-76a6-b62f-250efdaea2c7",
  type: "page-type/image",
  slug: "image-17fc3f202f595c4c",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, the exact peak moment of orgasm, face contorted in overwhelming pleasure, mouth open in a silent cry, eyes squeezed shut, brows drawn up, deep crimson flush flooding her cheeks and chest, dark wavy hair wild against the pillow, damp at the temples, neck arched, warm golden lamplight, photoreal, cinematic, extreme close-up, raw and vulnerable and undone, the careful one completely gone, tasteful framing, bare shoulders.",
  seed: 1710073089,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
