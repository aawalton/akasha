import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image636bfabc49e9ca69 = {
  id: "019f237a-5cea-74dd-94b4-0843e78d5fee",
  type: "page-type/image",
  slug: "image-636bfabc49e9ca69",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photoreal portrait, head and shoulders to chest, of a woman dryad fused with technology, in a banyan grove at night. Smooth bark texture blends into the skin of her shoulders and neck, with thin seams of soft green-gold light glowing between the bark plates like sap made of data; small banyan leaves and fine aerial roots woven through her dark hair, tiny points of light nested among them like fireflies. Her eyes glow a gentle luminous green. Behind her, a massive hybrid banyan: aerial roots thickening into braided black cables as they descend, bark grain patterned like circuit traces, small status-light knots glowing amber and green along the trunk, the tree and the woman sharing the same green-gold light. Direct gaze at the viewer, utterly still, serene and rooted, a faintly uncanny composure, no smile. Cinematic, intimate, photographic realism, not painterly.",
  seed: 6329,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
