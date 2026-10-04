import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image5cc7eab99f09d015 = {
  id: "01a107a3-5df9-75e4-9316-cf9e1eacee51",
  type: "page-type/image",
  slug: "image-5cc7eab99f09d015",
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
    "Keep this exact woman: same face, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic, candid photograph, she does not look at the camera. She is a gorgeous, slim, athletic young Korean woman of twenty-one with a K-pop idol's pretty face: a small V-line face, almond-shaped eyes of bright green, a small nose, full lips in a crooked teasing grin, warm sun-kissed golden skin dusted with light freckles across her nose and cheeks, and a wild mass of long copper-red curls, barely tied back, with a slim build and small chest; her copper curls are soaking wet and pushed back off her face. She wears a plain white bathing shift of thick opaque linen, wet. She stands chest-deep in a great warm bathhouse pool tiled all over in every shade of green, steaming softly, under a high coppery-gold dome with long shafts of light falling through the steam from a lantern at its top, just come up from a dive, water streaming off her chin, her lips parted, her head tipped back staring very hard up at the dome, cheeks flushed. Nothing lettered. Medium shot, 50mm lens, shallow depth of field, her face sharp.",
} as const satisfies Image
