import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCd7920c2fdc9ca28 = {
  id: "01a107a6-55c9-7ba7-ab32-6b4eb09fe5a2",
  type: "page-type/image",
  slug: "image-cd7920c2fdc9ca28",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-d34454b4584b976c",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic, candid photograph, she does not look at the camera. She is a gorgeous, slim, athletic young Korean woman of twenty-one with a K-pop idol's pretty face: a small V-line face, almond-shaped eyes of bright green, a small nose, full lips in a crooked teasing grin, warm sun-kissed golden skin dusted with light freckles across her nose and cheeks, and a wild mass of long copper-red curls, barely tied back, with a slim build and small chest; her copper curls are wet. She wears a big rough white towel wrapped round her body up under her arms, her freckled shoulders bare and slick with steam. She sits on the slatted cedar bench of a small round steam room tiled in white, with a slatted wooden bench round the wall, thick white steam in the air, her back against the tiles, her head tipped back and her eyes shut, her chest rising and falling fast, her cheeks flushed red. Nothing lettered. Medium shot, 50mm lens, shallow depth of field.",
} as const satisfies Image
