import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0236d30ee6783441 = {
  id: "01a106f3-fb0e-7b28-8efa-781f4fc65154",
  type: "page-type/image",
  slug: "image-0236d30ee6783441",
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
    "Fantasy photorealistic candid photograph, she does not look at the camera. Keep the place from the first image, the attic room, now at night in candlelight. The pink-haired woman from the second image kneels on the floorboards beside the wooden crate of houseplants under the round window, still in her boots, leaning close to a feathery fern and whispering to it with a happy, wondering smile, one finger gently touching a leaf; a lemon tree, an aloe and a pot of mint sit beside it. The pink-haired woman: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, tall boots. A candle on the floor beside her, the round window dark with distant lantern glow. Warm candlelight, soft shadows. Medium shot at floor level, 50mm lens, her face clear in profile.",
} as const satisfies Image
