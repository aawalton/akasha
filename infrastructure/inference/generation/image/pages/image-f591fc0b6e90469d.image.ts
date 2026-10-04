import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF591fc0b6e90469d = {
  id: "01a106ee-8ff9-7f72-b012-c57ed0b88129",
  type: "page-type/image",
  slug: "image-f591fc0b6e90469d",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-1a035334afa7d475",
  referenceImages: ["image/image-e6523dfa77c4852c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image: this moment is at the long desk in the main hall. The pink-haired woman from the second image divides a little heap of copper coins on the desk with one finger, while a small floating translucent window of soft white light, marked only with glowing glyphs, opens in the air before her. The pink-haired woman from the second image is a gorgeous, slim young Korean woman of about twenty with a K-pop idol's face: a small V-line face, big sparkling doe eyes in soft rose pink the same color as her hair, a small delicate nose, glossy pink lips, pale porcelain skin with a soft blush, a sweet bright smile, and short soft rose-pink hair in a layered bob with wispy side-swept bangs, a small pink-and-white flower clip above one ear, with a slim build and small chest, wearing a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with pouches, brown fingerless gloves and tall brown boots. Early afternoon daylight. Nothing lettered. Medium shot, 35mm lens, shallow depth of field, every face sharp and readable.",
} as const satisfies Image
