import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image738ff3137ce7725e = {
  id: "01a10657-c644-7192-b7bd-b22b5819c6ff",
  type: "page-type/image",
  slug: "image-738ff3137ce7725e",
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
    "Fantasy photorealistic. Keep the place from the first image: this moment is by the wooden crate of potted plants. The woman from the second image, a gorgeous, slim young Korean woman of about twenty with a K-pop idol's face: a small V-line face, big sparkling doe eyes in soft rose pink the same color as her hair, a small delicate nose, glossy pink lips, pale porcelain skin with a soft blush, a sweet bright smile, and short soft rose-pink hair in a layered bob with wispy side-swept bangs, a small pink-and-white flower clip above one ear, wearing a plain white linen shift. She stands barefoot by the crate tipping a small jug of water round the roots of a big old fern, bent close to it, whispering to it with a pleased secret smile. Grey early dawn light through the round window, soft and cool. Exactly one woman in frame, no other faces in focus, nothing lettered. Medium shot, 35mm lens, shallow depth of field, every face sharp and readable.",
} as const satisfies Image
