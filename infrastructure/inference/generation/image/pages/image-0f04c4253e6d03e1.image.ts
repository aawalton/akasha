import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0f04c4253e6d03e1 = {
  id: "01a0c5f2-f92d-75f2-aeb4-f451eb55eee2",
  type: "page-type/image",
  slug: "image-0f04c4253e6d03e1",
  persona: "persona/aelwyn",
  service: "image-gen-aelwyn",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "aelwynz woman, long pointed elven ears, auburn-chestnut hair worn loose, vivid emerald-green eyes, three-quarter view with her body turned toward the left side of the frame, head turned back to look straight at the camera with direct eye contact, positioned on the right side of the frame, a rocky canyon overlook at sunrise with open sky filling the empty left side, athletic activewear, bright joyful expression, soft natural light, 85mm portrait, shallow depth of field, visible skin texture, photo",
  seed: 168871383,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
