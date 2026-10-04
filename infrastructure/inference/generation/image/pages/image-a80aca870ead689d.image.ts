import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA80aca870ead689d = {
  id: "01a10724-40da-7ecb-8a2e-4df1959155d6",
  type: "page-type/image",
  slug: "image-a80aca870ead689d",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-bfcce933d8b9acf1",
  referenceImages: ["image/image-e6523dfa77c4852c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image: this moment is in the attic room by the round window, a crate of potted plants beside it. The pink-haired woman from the second image stands before a small piece of mirror propped on the sill, both hands raised to pin the pink-and-white clip above her ear, her eyes on her reflection, anxious and careful. A small watering jug and the potted plants sit beside her. The pink-haired woman from the second image is a gorgeous, slim young Korean woman of about twenty with a K-pop idol's face: a small V-line face, big sparkling doe eyes in soft rose pink the same color as her hair, a small delicate nose, glossy pink lips, pale porcelain skin with a soft blush, a sweet bright smile, and short soft rose-pink hair in a layered bob with wispy side-swept bangs, a small pink-and-white flower clip above one ear, with a slim build and small chest, wearing a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with pouches, brown fingerless gloves and tall brown boots. Early morning, soft grey-gold dawn light through the round window. Nothing lettered. Medium shot, 35mm lens, shallow depth of field, every face sharp and readable.",
} as const satisfies Image
