import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCb3a89a934f972f9 = {
  id: "01a0c5f2-f92d-7002-ab08-afc94421d5b9",
  type: "page-type/image",
  slug: "image-cb3a89a934f972f9",
  persona: "persona/aelwyn",
  service: "image-gen-aelwyn",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "aelwynz woman, long pointed elven ears, auburn-chestnut hair worn loose with a few small braids, vivid emerald-green eyes, wearing fitted elven leather huntress armor in forest-green with a leather pauldron and soft worn detailing, three-quarter view with her body turned toward the left side of the frame, head turned back to look straight at the camera with direct eye contact, positioned on the right side of the frame, a rugged forested mountain canyon at golden hour with tall pines on rocky slopes rising into the distance on the left, warm sunlight through the trees, 85mm portrait, shallow depth of field, visible skin texture, photo",
  seed: 828030756,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
