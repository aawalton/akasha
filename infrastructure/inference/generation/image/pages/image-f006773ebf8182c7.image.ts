import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF006773ebf8182c7 = {
  id: "01a106e1-77ef-7b5f-a64c-d2486cc988b7",
  type: "page-type/image",
  slug: "image-f006773ebf8182c7",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-f00952ec43ad7bf7",
  referenceImages: ["image/image-e6523dfa77c4852c", "image/image-fba84451f24bca40"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image: this moment is in Tanner's Row, a long narrow crooked lane behind the tanneries, its tall old houses leaning together overhead with washing strung between them. The pink-haired woman from the second image and the black-haired woman from the third image stand in the lane eating sugared buns. The pink-haired woman from the second image licks sugar off her fingers, smiling. The black-haired woman from the third image eats in small neat bites, looking up at the roofs. The pink-haired woman from the second image is a gorgeous, slim young Korean woman of about twenty with a K-pop idol's face: a small V-line face, big sparkling doe eyes in soft rose pink the same color as her hair, a small delicate nose, glossy pink lips, pale porcelain skin with a soft blush, a sweet bright smile, and short soft rose-pink hair in a layered bob with wispy side-swept bangs, a small pink-and-white flower clip above one ear, with a slim build and small chest, wearing a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with pouches, brown fingerless gloves and tall brown boots. The black-haired woman from the third image is a gorgeous, tall, willowy young Japanese woman of twenty-four with a J-pop idol's face: a fine-boned delicate oval face, high cheekbones, cool grey eyes under straight dark brows, a small straight nose, soft full lips set in a composed unsmiling line, flawless pale porcelain skin, and glossy black hair scraped smoothly back from a bare forehead, no fringe, into a severe low bun at the nape, not a strand loose, with a slim build and small chest, wearing a long charcoal-grey guild coat buttoned to the throat, slim dark trousers and black boots. Late summer morning, bright sun high on the roofs, warm shade below. Nothing lettered. Medium shot, 35mm lens, shallow depth of field, every face sharp and readable.",
} as const satisfies Image
