import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8f8063fec5107331 = {
  id: "01a0c5f2-f92d-72ba-a6d1-c40eedff0f99",
  type: "page-type/image",
  slug: "image-8f8063fec5107331",
  persona: "persona/aelwyn",
  service: "image-gen-aelwyn",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "aelwynz woman, long pointed elven ears, auburn-chestnut hair worn loose, vivid emerald-green eyes, three-quarter view with her body turned toward the left side of the frame, head turned back to look straight at the camera with direct eye contact, positioned on the right side of the frame, a sunlit forest trail among tall pines opening into the empty left side, athletic activewear, warm smile, golden hour backlight, 85mm portrait, shallow depth of field, visible skin texture, photo",
  seed: 851826820,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
