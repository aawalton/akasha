import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image510b084d0cb690f6 = {
  id: "01a0c5f2-f92d-7a04-b4ab-fd3a74c3388f",
  type: "page-type/image",
  slug: "image-510b084d0cb690f6",
  persona: "persona/aelwyn",
  service: "image-gen-aelwyn",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "aelwynz woman, long pointed elven ears, auburn-chestnut hair worn loose, vivid emerald-green eyes, wearing fitted elven leather armor in forest-green and brown with subtle tooled detailing and soft worn leather, three-quarter view with her body turned toward the left side of the frame, head turned back to look straight at the camera with direct eye contact, positioned on the right side of the frame, a forested mountain canyon with tall pines climbing rocky slopes and a dirt trail ascending the mountainside opening into the empty left side, warm golden hour light filtering through the trees, 85mm portrait, shallow depth of field, visible skin texture, photo",
  seed: 1067622707,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
