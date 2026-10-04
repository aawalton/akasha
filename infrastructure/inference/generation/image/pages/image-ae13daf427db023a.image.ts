import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAe13daf427db023a = {
  id: "01a10694-bf66-7b49-b121-b37c717b9f02",
  type: "page-type/image",
  slug: "image-ae13daf427db023a",
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
    "Fantasy photorealistic. Keep the place from the first image: this moment is in the Leftovers corner at the bottom of the party board, where chalked slates hang. The woman from the second image, a gorgeous, slim young Korean woman of about twenty with a K-pop idol's face: a small V-line face, big sparkling doe eyes in soft rose pink the same color as her hair, a small delicate nose, glossy pink lips, pale porcelain skin with a soft blush, a sweet bright smile, and short soft rose-pink hair in a layered bob with wispy side-swept bangs, a small pink-and-white flower clip above one ear, wearing a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with pouches, brown fingerless gloves and tall brown boots. She stands with her chin up, speaking clear and steady, looking up into the face of someone taller just out of frame. Morning sunlight slanting through the high windows in warm shafts. Exactly one woman in frame, no other faces in focus, nothing lettered. Medium shot, 35mm lens, shallow depth of field, every face sharp and readable.",
} as const satisfies Image
