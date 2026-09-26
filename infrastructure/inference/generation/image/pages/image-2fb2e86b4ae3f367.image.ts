import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2fb2e86b4ae3f367 = {
  id: "01a0c5f4-03a4-73e7-83e3-e45b3c8a9da9",
  type: "page-type/image",
  slug: "image-2fb2e86b4ae3f367",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photorealistic portrait of a young Norse goddess at a great wooden loom, unearthly beautiful. Pale skin that visibly glows faintly from within, long bronze-gold hair with a metallic sheen like drawn wire, loosely pinned up with escaping strands. Luminous molten-amber eyes that seem to hold slow-moving golden light. She works threads of faintly glowing gold light strung on the loom, the glow reflecting on her face and hands. Sleeves rolled, fine linen and bronze-clasped work dress. Ancient hall, roots of the world-tree and a stone well behind her, warm lamplight and the gold thread-light mingling, numinous, photoreal, chest-up composition",
  seed: 4104,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
