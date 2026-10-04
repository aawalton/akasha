import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image250419a115b409bc = {
  id: "01a106f5-bd5d-79e3-b5ee-715bf5b056f6",
  type: "page-type/image",
  slug: "image-250419a115b409bc",
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
    "Fantasy photorealistic candid photograph, she does not look at the camera. Keep the place from the first image, the attic room, late at night. The pink-haired woman from the second image lies asleep on her back on the narrow bed with the patchwork quilt, fully dressed, boots off on the floor beside the bed, a small blue notebook lying open on her chest, one hand resting on it, her face peaceful and content, eyes closed. Above her the round window stands open onto the night canal, strings of paper lanterns glowing outside. The pink-haired woman: a gorgeous slim young Korean woman of about twenty, small V-line face, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt. Soft warm lantern glow from the window and a guttering candle, deep blue night shadows. Medium shot from beside the bed, 35mm lens, her face clear.",
} as const satisfies Image
