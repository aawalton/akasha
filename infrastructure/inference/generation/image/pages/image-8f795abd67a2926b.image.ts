import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image8f795abd67a2926b = {
  id: "01a106d1-92ad-7572-9b7a-1cc38f16e98b",
  type: "page-type/image",
  slug: "image-8f795abd67a2926b",
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
    "Fantasy photorealistic. Keep the place from the first image: this moment is on the ridge of the highest roof in Tanner's Row, the tilted city spread out round it. The first woman is the woman from the second image, a gorgeous, slim young Korean woman of about twenty with a K-pop idol's face: a small V-line face, big sparkling doe eyes in soft rose pink the same color as her hair, a small delicate nose, glossy pink lips, pale porcelain skin with a soft blush, a sweet bright smile, and short soft rose-pink hair in a layered bob with wispy side-swept bangs, a small pink-and-white flower clip above one ear, wearing a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with pouches, brown fingerless gloves and tall brown boots. The second woman is the woman from the third image, a gorgeous, slim, athletic young Korean woman of twenty-one with a K-pop idol's pretty face: a small V-line face, almond-shaped eyes of bright green, a small nose, full lips in a crooked teasing grin, warm sun-kissed golden skin dusted with light freckles across her nose and cheeks, and a wild mass of long copper-red curls, barely tied back, wearing a sleeveless battered brown leather jerkin, cloth knuckle wraps, dark trousers and scuffed boots, one forearm bandaged white from wrist to elbow. They are on hands and knees on the slates below the ridge, where a big ginger tom with a torn ear sits facing them with a long flat yellow stare. Late summer morning, bright sun high on the roofs, warm shade below. Exactly two women in frame, no other faces in focus, nothing lettered. Medium shot, 35mm lens, shallow depth of field, every face sharp and readable.",
} as const satisfies Image
