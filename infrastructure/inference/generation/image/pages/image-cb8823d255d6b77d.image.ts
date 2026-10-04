import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCb8823d255d6b77d = {
  id: "01a10741-fe1c-782b-a7fc-d81f34f09809",
  type: "page-type/image",
  slug: "image-cb8823d255d6b77d",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-8730538525d4f995",
  referenceImages: ["image/image-e6523dfa77c4852c", "image/image-d34454b4584b976c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image: this moment is at the head of the coal wharf, the green barge with geraniums along its cabin roof moored down the line. The pink-haired woman from the second image holds the parcel and the marigolds tucked in the crook of one arm, and with her free hand holds the hand of the copper-haired woman from the third image, fingers laced tight. The copper-haired woman from the third image looks down at their joined hands as if she had forgotten she had one. The pink-haired woman from the second image is a gorgeous, slim young Korean woman of about twenty with a K-pop idol's face: a small V-line face, big sparkling doe eyes in soft rose pink the same color as her hair, a small delicate nose, glossy pink lips, pale porcelain skin with a soft blush, a sweet bright smile, and short soft rose-pink hair in a layered bob with wispy side-swept bangs, a small pink-and-white flower clip above one ear, with a slim build and small chest, wearing a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with pouches, brown fingerless gloves and tall brown boots. The copper-haired woman from the third image is a gorgeous, slim, athletic young Korean woman of twenty-one with a K-pop idol's pretty face: a small V-line face, almond-shaped eyes of bright green, a small nose, full lips in a crooked teasing grin, warm sun-kissed golden skin dusted with light freckles across her nose and cheeks, and a wild mass of long copper-red curls, barely tied back, with a slim build and small chest, wearing a clean faded green shirt with the sleeves rolled to the elbow, dark trousers and scuffed boots, no jerkin; today her curls are wet and combed flat into a tight damp tail. Bright early summer morning sun on the coal wharf, long shadows, coal heaps and moored painted barges blurred behind. Nothing lettered. Medium shot, 35mm lens, shallow depth of field, every face sharp and readable.",
} as const satisfies Image
