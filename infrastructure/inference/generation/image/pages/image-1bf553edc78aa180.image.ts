import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1bf553edc78aa180 = {
  id: "01a10730-99c5-75d8-a5bb-f843476fb16a",
  type: "page-type/image",
  slug: "image-1bf553edc78aa180",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image: this moment is in the attic room under the sloped beams, at the wooden crate of potted plants beneath the round window over the canal. The pink-haired woman from the second image kneels on the plank floor beside the crate, alone in the room, tipping a small chipped jug of water into the pot of the little lemon tree, her other hand cupped under a leaf. She leans toward the plants, her lips parted as if speaking softly to them, her eyes on the leaves, hopeful and a little nervous. The pink-haired woman from the second image is a gorgeous, slim young Korean woman of about twenty with a K-pop idol's face: a small V-line face, big sparkling doe eyes in soft rose pink the same color as her hair, a small delicate nose, glossy pink lips, pale porcelain skin with a soft blush, a sweet bright smile, and short soft rose-pink hair in a layered bob with wispy side-swept bangs, a small pink-and-white flower clip above one ear, with a slim build and small chest, her hair freshly brushed and shining, wearing a cropped cream halter top laced up the front with a neat bow, a short sage-green skirt, a brown leather belt with pouches, brown fingerless gloves and tall brown boots. Six in the morning, soft pale gold early sunlight through the round window, the canal bright beyond it. Only one woman in the picture, no mirror, no reflection. Nothing lettered. Medium shot, 35mm lens, shallow depth of field, her face sharp and readable.",
} as const satisfies Image
