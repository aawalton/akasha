import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image40db9475386524d7 = {
  id: "019f1839-3aa4-718f-8a56-fb2cf0b36cb8",
  type: "page-type/image",
  slug: "image-40db9475386524d7",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "Three-quarter portrait of a young woman, Caucasian, warm wavy brown hair, bright blue eyes, pretty face, a warm confident half-smile, looking directly at the viewer, a subtle gleam of inspiration in her eyes (natural, not glowing). A princess and mechanical engineer in a high-fantasy solarpunk world. She rests a massive ornate brass forging hammer against her shoulder. She wears a classic cute pastel Lolita princess dress with no metal on the dress, and a brown leather engineer's work-belt over it. Warm golden light, softly blurred solarpunk workshop of brass and flowering vines. Clean face no smudges. Painterly, luminous, highly detailed.",
  seed: 4312,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
