import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3e05f925a6c7b58e = {
  id: "019f2384-14d6-7aec-b3d4-c79201a16458",
  type: "page-type/image",
  slug: "image-3e05f925a6c7b58e",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Photoreal portrait, head and shoulders to chest, of a woman dryad fused with technology, in a banyan grove at night. Her skin is a soft living leaf-green all over — smooth, alive, warm, like chlorophyll under a fine human surface — with delicate solarpunk technology veins glowing gold and green just beneath the skin, branching like leaf veins and circuit traces across her chest, shoulders, throat and temples, pulsing faintly like photosynthesis made visible. She wears nothing; her green skin is her covering. Fine aerial roots woven through her dark hair with tiny points of light nested among them like fireflies. Her eyes glow a gentle luminous green. Behind her, a massive hybrid banyan: aerial roots thickening into braided black cables, bark grain patterned like circuit traces, small status-light knots glowing amber and green. Direct gaze at the viewer, utterly still, serene and rooted, a faintly uncanny composure, no smile. Cinematic, intimate, photographic realism, not painterly.",
  seed: 6333,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
