import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7b01ac2ed404db26 = {
  id: "019f2381-27c5-7ae3-83a4-7d58c0b8cd61",
  type: "page-type/image",
  slug: "image-7b01ac2ed404db26",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photoreal portrait, head and shoulders to chest, of a dryad woman whose body is grown from smooth living banyan wood, in a banyan grove at night. Her torso, shoulders and arms are polished living wood with fine wood-grain flowing along the natural shape of her body, smooth as driftwood, and the wood transitions gradually into soft human skin at her upper chest, throat and face; thin seams of soft green-gold light glow along the grain lines like sap made of data. A leaf-veined luminous plate climbs one side of her neck along the jawline to her temple; small banyan leaves and fine aerial roots woven through her dark hair, tiny points of light like fireflies. Her eyes glow a gentle luminous green. Behind her, a massive hybrid banyan: aerial roots thickening into braided black cables, bark grain patterned like circuit traces, small status-light knots glowing amber and green. Direct gaze at the viewer, utterly still, serene and rooted, a faintly uncanny composure, no smile. Cinematic, intimate, photographic realism, not painterly.",
  seed: 6333,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
