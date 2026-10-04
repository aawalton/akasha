import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image21bdad80179a1c83 = {
  id: "01a107a2-6d5e-73b2-9e25-c88a8a7d5b41",
  type: "page-type/image",
  slug: "image-21bdad80179a1c83",
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
    "Keep this exact woman: same face, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic, candid photograph, she does not look at the camera. She is a gorgeous, slim, athletic young Korean woman of twenty-one with a K-pop idol's pretty face: a small V-line face, almond-shaped eyes of bright green, a small nose, full lips in a crooked teasing grin, warm sun-kissed golden skin dusted with light freckles across her nose and cheeks, and a wild mass of long copper-red curls, barely tied back, with a slim build and small chest. She wears a sleeveless battered brown leather jerkin buckled over a faded green shirt, cloth knuckle wraps, dark trousers and scuffed boots. She stands in a steamy stone bathhouse hall with an iron stair behind her, grinning all over her face, both hands busy unbuckling the front of her jerkin, eagerly, looking up the stair toward the pools. Warm lamplight through steam, copper pipes on the wall. Nothing lettered. Medium full shot, 35mm lens, shallow depth of field.",
} as const satisfies Image
