import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDc270ec75684bb5a = {
  id: "01a0c5f3-db28-7fb5-8e36-e061def22a20",
  type: "page-type/image",
  slug: "image-dc270ec75684bb5a",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, extreme close-up of her face lost in pleasure, head tipped back against a pillow, lips parted, eyes half-closed and fluttering, deep flush across her cheeks and throat, dark wavy hair spread loose, a few strands stuck to her temple, warm golden lamplight, photoreal, cinematic, shallow depth of field, intimate, sensual, her composure finally gone, vulnerable and undone, tasteful, bare shoulders.",
  seed: 1597293665,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
