import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8973cb4a8630f82a = {
  id: "019f2371-10f4-7d93-8426-b6821d8cf8fb",
  type: "page-type/image",
  slug: "image-8973cb4a8630f82a",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photoreal portrait, head and shoulders to chest, of a woman dryad fused with technology, in a banyan grove at night. Smooth bark texture blends into the skin of her shoulders and neck, with thin seams of soft green-gold light glowing between the bark plates like sap made of data; small banyan leaves and fine aerial roots woven through her dark hair, tiny points of light nested among them like fireflies. Her eyes glow a gentle luminous green. Behind her, massive banyan trunks and hanging roots threaded with faint cables, soft server-light glow in the deep green dark. Direct gaze at the viewer, serene and rooted. Cinematic, intimate, photographic realism, not painterly.",
  seed: 6302,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
