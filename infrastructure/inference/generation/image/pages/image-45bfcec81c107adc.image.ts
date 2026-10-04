import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image45bfcec81c107adc = {
  id: "01a10702-1b06-71ad-9de3-d794d0c52a99",
  type: "page-type/image",
  slug: "image-45bfcec81c107adc",
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
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image: this moment is downstairs in the bakery after closing, at the big floury wooden table in the middle. The pink-haired woman from the second image writes hurriedly in a small notebook open on the corner of the floury table beside a flour crock, with a stub of pencil. The pink-haired woman from the second image is a gorgeous, slim young Korean woman of about twenty with a K-pop idol's face: a small V-line face, big sparkling doe eyes in soft rose pink the same color as her hair, a small delicate nose, glossy pink lips, pale porcelain skin with a soft blush, a sweet bright smile, and short soft rose-pink hair in a layered bob with wispy side-swept bangs, a small pink-and-white flower clip above one ear, with a slim build and small chest, wearing a big white baker's apron tied over a cropped cream halter top and short sage-green skirt, bare arms, no gloves. Evening after closing, warm lamplight and the red glow of the ovens. Nothing lettered. Medium shot, 35mm lens, shallow depth of field, every face sharp and readable.",
} as const satisfies Image
