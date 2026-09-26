import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image671ed871660f1998 = {
  id: "01a0c5f4-03a4-79cd-bc92-64f67e715f02",
  type: "page-type/image",
  slug: "image-671ed871660f1998",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a beautiful young Norse woman at a great wooden loom, warm lamplight. Pale luminous skin that seems faintly lit from within, dark honey-bronze hair pinned up loosely with escaping strands, quick amber-brown eyes, sleeves rolled to the elbow, linen work dress, fine wool thread wound around one wrist. She is mid-motion passing the shuttle, caught looking up with a bright engaged expression, hands still working. Ancient hall interior, the roots of a great tree and a stone well behind her, warm gold light, shallow depth of field, head-and-shoulders-to-chest composition",
  seed: 4101,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
