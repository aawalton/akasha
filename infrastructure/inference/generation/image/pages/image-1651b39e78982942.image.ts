import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1651b39e78982942 = {
  id: "01a1076d-192f-7b69-b93d-b3aff1167609",
  type: "page-type/image",
  slug: "image-1651b39e78982942",
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
    "Keep this exact woman: same face, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic, candid photograph, she does not look at the camera. She is a gorgeous, slim, athletic young Korean woman of twenty-one with a K-pop idol's pretty face: a small V-line face, almond-shaped eyes of bright green, a small nose, full lips in a crooked teasing grin, warm sun-kissed golden skin dusted with light freckles across her nose and cheeks, and a wild mass of long copper-red curls, barely tied back, with a slim build and small chest; her curls are springing loose from a comb in the damp. She wears a faded green shirt with the sleeves rolled, a fat bundle of folded letters making a square lump inside the shirt over her heart, dark trousers, cloth knuckle wraps and scuffed boots. She walks over a stone canal bridge in thick white morning mist with her hands in her pockets, quiet, a small private smile tugging one corner of her mouth, looking away over the misty canal. Paper lanterns hang unlit and wet along the towpath, the far bank only shapes. Cool soft white early morning light. Nothing lettered. Medium full shot, 35mm lens, shallow depth of field.",
} as const satisfies Image
