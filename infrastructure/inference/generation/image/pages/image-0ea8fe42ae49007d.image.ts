import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0ea8fe42ae49007d = {
  id: "01a10765-5474-7a5c-bf50-23587b8684e0",
  type: "page-type/image",
  slug: "image-0ea8fe42ae49007d",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-246e36c57c623c14",
  referenceImages: ["image/image-4245fb8b8d3d84d1"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, before the tall dark shut doors at the far end. The red-haired woman from the second image looks up toward the gold band above the doors, and her face has changed: the panic gone still and sharp, focused and lawyerly, her mouth set, her green eyes narrowed in calculation. She holds her sheet at her chest with one hand and with the other counts off on her fingers, three fingers raised, as if reading terms across a desk. She is very slender, pale and narrow-shouldered, light freckles across her shoulders, fine features, long red-gold hair in one thick plait over her shoulder, her face as in the second image. She wears a white linen bath sheet wrapped high from her armpits to her thighs. Behind and above her the dark doors and a warm gold glow from the inlaid band with no readable letters, steam in gold oculus light. Medium shot, head to waist, three-quarter profile from slightly below, 85mm lens, shallow depth of field, no other people.",
} as const satisfies Image
