import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image64358784c067e930 = {
  id: "01a0c5f2-f92d-72e1-8cff-14d33cfec920",
  type: "page-type/image",
  slug: "image-64358784c067e930",
  persona: "persona/aelwyn",
  service: "image-gen-aelwyn",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "aelwynz woman, long pointed elven ears, auburn-chestnut hair worn loose, vivid emerald-green eyes, wearing a fitted elven leather ranger tunic and bracers in muted green and brown with leaf-shaped detailing, three-quarter view with her body turned toward the left side of the frame, head turned back to look straight at the camera with direct eye contact, positioned on the right side of the frame, a steep forested canyon climbing a mountainside with pines on rocky walls and a winding trail, warm late-afternoon sun, 85mm portrait, shallow depth of field, visible skin texture, photo",
  seed: 2018827224,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
