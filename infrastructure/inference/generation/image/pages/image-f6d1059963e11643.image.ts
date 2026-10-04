import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF6d1059963e11643 = {
  id: "01a106f9-da76-72a6-8a26-f7a469abc478",
  type: "page-type/image",
  slug: "image-f6d1059963e11643",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-f00952ec43ad7bf7",
  referenceImages: ["image/image-e6523dfa77c4852c", "image/image-d34454b4584b976c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image: this moment is walking along the canal path beside the water, past arched bridges and moored boats. The pink-haired woman from the second image and the copper-haired woman from the third image walk side by side, close, the copper-haired woman from the third image with a great axe over her shoulder and her bandaged arm brushing the pink-haired woman from the second image's, glancing at her sideways. The pink-haired woman from the second image is a gorgeous, slim young Korean woman of about twenty with a K-pop idol's face: a small V-line face, big sparkling doe eyes in soft rose pink the same color as her hair, a small delicate nose, glossy pink lips, pale porcelain skin with a soft blush, a sweet bright smile, and short soft rose-pink hair in a layered bob with wispy side-swept bangs, a small pink-and-white flower clip above one ear, with a slim build and small chest, wearing a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with pouches, brown fingerless gloves and tall brown boots. The copper-haired woman from the third image is a gorgeous, slim, athletic young Korean woman of twenty-one with a K-pop idol's pretty face: a small V-line face, almond-shaped eyes of bright green, a small nose, full lips in a crooked teasing grin, warm sun-kissed golden skin dusted with light freckles across her nose and cheeks, and a wild mass of long copper-red curls, barely tied back, with a slim build and small chest, wearing a sleeveless battered brown leather jerkin, cloth knuckle wraps, dark trousers and scuffed boots, one forearm bandaged white from wrist to elbow. Bright afternoon summer sun on the water, paper lanterns hanging unlit on their strings. Nothing lettered. Medium shot, 35mm lens, shallow depth of field, every face sharp and readable.",
} as const satisfies Image
