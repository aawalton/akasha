import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7f9e54c2a4121ad1 = {
  id: "01a0c5f2-f92d-7edb-8679-1f94c58acaca",
  type: "page-type/image",
  slug: "image-7f9e54c2a4121ad1",
  persona: "persona/aelwyn",
  service: "image-gen-aelwyn",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "aelwynz woman, long pointed elven ears, auburn-chestnut hair worn loose, vivid emerald-green eyes, three-quarter view with her body turned toward the left side of the frame, head turned back to look straight at the camera with direct eye contact, positioned on the right side of the frame, an ancient towering redwood forest with soft dappled green light opening into the empty left side, fitted athletic top, serene attentive expression, 85mm portrait, shallow depth of field, visible skin texture, photo",
  seed: 221657160,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
