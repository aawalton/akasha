import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image961c8a6def90046a = {
  id: "01a1075f-8774-7ce2-bfe7-3756be49c2c5",
  type: "page-type/image",
  slug: "image-961c8a6def90046a",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image, right in front of the tall shut bronze doors at the far end of the hall. The red-haired woman from the second image stands looking up at the gold band above the doors, her face flushed deep pink, a blush running from her cheeks down her throat and across her freckled chest to the edge of her sheet, her lips pressed together, her green eyes lowered then lifting again, mortified. One hand holds her sheet clutched tight at her breastbone. She is very slender, pale and narrow-shouldered, light freckles across her shoulders, long red-gold hair in one thick plait over her shoulder, face as in the second image. She wears a white linen bath sheet wrapped high from her armpits to her thighs. Behind her the bronze doors gleam, gold light glinting from the inlaid band above them, with no readable letters. Steam drifts in the gold oculus light. Medium close shot, head to waist, from slightly below, 85mm lens, shallow depth of field.",
} as const satisfies Image
