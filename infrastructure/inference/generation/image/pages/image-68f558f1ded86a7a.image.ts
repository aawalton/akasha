import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image68f558f1ded86a7a = {
  id: "01a106fa-b002-7540-aaab-6f0b17f02375",
  type: "page-type/image",
  slug: "image-68f558f1ded86a7a",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-f00952ec43ad7bf7",
  referenceImages: ["image/image-e6523dfa77c4852c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image: this moment is on the doorstep of a bakery on the canal path. The pink-haired woman from the second image stands on the step watching someone go off along the canal out of frame, listening, smiling. The pink-haired woman from the second image is a gorgeous, slim young Korean woman of about twenty with a K-pop idol's face: a small V-line face, big sparkling doe eyes in soft rose pink the same color as her hair, a small delicate nose, glossy pink lips, pale porcelain skin with a soft blush, a sweet bright smile, and short soft rose-pink hair in a layered bob with wispy side-swept bangs, a small pink-and-white flower clip above one ear, with a slim build and small chest, wearing a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with pouches, brown fingerless gloves and tall brown boots. Bright afternoon summer sun on the water, paper lanterns hanging unlit on their strings. Nothing lettered. Medium shot, 35mm lens, shallow depth of field, every face sharp and readable.",
} as const satisfies Image
