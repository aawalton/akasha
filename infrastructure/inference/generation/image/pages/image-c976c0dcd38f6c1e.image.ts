import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC976c0dcd38f6c1e = {
  id: "01a106f2-682d-711b-86bb-0bd05ae37b1d",
  type: "page-type/image",
  slug: "image-c976c0dcd38f6c1e",
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
    "Fantasy photorealistic candid photograph, she does not look at the camera. Keep the place from the first image, the attic room with its sloped beams and round window, now at night lit only by one candle. The pink-haired woman from the second image sits on the edge of the narrow bed with her boots still on, a small blue notebook open on her knees, writing carefully in it with a pen, head bent close over the page, a soft fond smile. The candle stands on the little table beside her. The pink-haired woman: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, tall boots. The window is dark with a few lantern glows from the canal outside. Warm candlelight on her face and the page, deep shadows in the room. Medium shot, 50mm lens, her face clear, shallow depth of field.",
} as const satisfies Image
