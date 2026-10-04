import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2b363c492ecf8be0 = {
  id: "01a1068a-6fbb-73ca-97e2-ebb59ebd0258",
  type: "page-type/image",
  slug: "image-2b363c492ecf8be0",
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
    "Fantasy photorealistic. Keep the place from the first image: this moment is upstairs in the guildmaster's office, a plain room with a big window over the square, a desk heaped with papers, and a long sword in a plain worn scabbard on two pegs on the wall. The woman from the second image, a gorgeous, slim young Korean woman of about twenty with a K-pop idol's face: a small V-line face, big sparkling doe eyes in soft rose pink the same color as her hair, a small delicate nose, glossy pink lips, pale porcelain skin with a soft blush, a sweet bright smile, and short soft rose-pink hair in a layered bob with wispy side-swept bangs, a small pink-and-white flower clip above one ear, wearing a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with pouches, brown fingerless gloves and tall brown boots. She stands thinking, then speaks slowly, a hopeful earnest look in her pink eyes. Morning daylight from a big window over the square. Exactly one woman in frame, no other faces in focus, nothing lettered. Medium shot, 35mm lens, shallow depth of field, every face sharp and readable.",
} as const satisfies Image
