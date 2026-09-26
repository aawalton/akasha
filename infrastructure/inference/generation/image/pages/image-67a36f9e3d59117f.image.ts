import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image67a36f9e3d59117f = {
  id: "01a0c5f2-eb24-769e-9314-bc18e49258c6",
  type: "page-type/image",
  slug: "image-67a36f9e3d59117f",
  persona: "persona/abby",
  service: "image-gen-abby",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "abbyz woman, sitting on a cozy bed facing the viewer, wearing soft comfortable pajamas, warm dimly-lit bedroom at night, gentle bedside lamp glow, intimate close-up portrait, direct eye contact with the viewer, soft warm affectionate smile, relaxed and at ease, 50mm, shallow depth of field, visible skin texture, soft fabric weave, photoreal, warm color grade",
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
