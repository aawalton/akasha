import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image892b31311e6771c0 = {
  id: "019f1839-3a47-7500-9a17-7dc968a515ca",
  type: "page-type/image",
  slug: "image-892b31311e6771c0",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Waist-up portrait of a young woman, Caucasian, warm wavy brown hair, bright blue eyes, pretty delicate face, looking directly at the viewer, a subtle quiet gleam in her eyes (natural, not glowing). A princess and mechanical engineer in a high-fantasy solarpunk world, confident and warm. She holds a massive ornate forging warhammer of gleaming brass and sun-catching crystal, nearly as tall as she is. She wears a classic cute pastel Lolita princess dress with no metal on it, and a brown leather engineer's work-belt and tool-belt buckled over the dress. Golden-hour light in a garden-forge of living vines and warm metal. Clean face, no smudges. Painterly, luminous, detailed.",
  seed: 4310,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
