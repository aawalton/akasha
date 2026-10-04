import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1d46258ab2130fd1 = {
  id: "01a10651-6b3f-7202-80bb-47a5a2f70b5e",
  type: "page-type/image",
  slug: "image-1d46258ab2130fd1",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, the attic room, in front of the small scrap of mirror on the wall. The pink-haired woman from the second image stands in front of the little mirror, newly dressed, one hand pinning a small pink-and-white flower clip above her left ear, the other smoothing the front of her top flat, looking at her reflection with a shy, proud, slightly nervous smile. A small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs; slim build, small chest; she wears a cropped cream halter top laced up the front with a neat bow, a short sage-green skirt, a brown belt with pouches, fingerless leather gloves and tall brown boots. Soft early morning light from the round window. Three-quarter view from behind her shoulder so her face and the mirror both read, medium shot, 50mm lens, shallow depth of field.",
} as const satisfies Image
